import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const axiosBaseQuery =
  () =>
  async ({ url, method, data }) => {
    try {
      const result = await axios({ url: url, method, data });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: axiosBaseQuery(),

  tagTypes: ['Contacts'],
  endpoints(build) {
    return {
      getContacts: build.query({
        query: () => ({ url: '/contacts', method: 'get' }),
        providesTags: ['Contacts'],
      }),

      addContact: build.mutation({
        query: body => {
          return { url: '/contacts', method: 'post', data: body };
        },
        invalidatesTags: ['Contacts'],
      }),
      updateContact: build.mutation({
        query: ({ id, ...fields }) => {
          return { url: `/contacts/${id}`, method: 'patch', data: fields };
        },
        invalidatesTags: ['Contacts'],
      }),
      deleteContact: build.mutation({
        query: id => {
          return { url: `/contacts/${id}`, method: 'delete' };
        },
        invalidatesTags: ['Contacts'],
      }),
    };
  },
});

export const {
  useGetContactsQuery,
  useDeleteContactMutation,
  useAddContactMutation,
  useUpdateContactMutation,
} = contactsApi;
