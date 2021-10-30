import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const goodsApi = createApi({
  reducerPath: 'goodsApi',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_GOODS_API_SERVER,
  }),
  endpoints: (builder) => ({
    getGoods: builder.query({
      query: (limit) => {
        return limit !== '' ? `/goods?_limit=${limit}` : `/goods`;
      },
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Products', id })), { type: 'Products', id: 'LIST' }]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    addProduct: builder.mutation({
      query: ({ body }) => {
        return {
          url: '/goods',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),

    deleteProduct: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/goods/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
  }),
});

export const { useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation } = goodsApi;
