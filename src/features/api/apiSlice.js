import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
  
export const productApi = createApi({
    reducerPath : "productApi",
    baseQuery : fetchBaseQuery({
        baseUrl : `https://moon-tech-server-ruddy.vercel.app`
    }),
    tagTypes :["Products"],
    endpoints : (builder)=>({
        getProducts : builder.query({
            query : (id)=> ({
                url :'/products',
            }),
            providesTags : ["Products"],
        }), 
        
        // Product post method
        addProduct : builder.mutation({
            query : (data)=>({
                url : '/product',
                method : "POST",
                body : data,
            }),
            invalidatesTags : ["Products"],
        }),

        // Product delete method
        removeProduct : builder.mutation({
            query : (id)=>({
                url : `/product/${id}`,
                method : "DELETE",
            }),
          invalidatesTags : ["Products"],
        }),
    })
})

export const { useGetProductsQuery, useAddProductMutation, useRemoveProductMutation} =productApi;