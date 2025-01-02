
import Store from "../Store";
const Slice = Store.ApiSlice.injectEndpoints({
    endpoints: (build) => ({
        GetData: build.query({
            query: (params) => ({
                url: Store.Api.Data,
                method: "PATCH",
                body: params
            }),
            providesTags: ["Data"]
        }),
        GetContacts: build.mutation({
            query: (DeveloperId) => ({
                url: `${Store.Api.Contact}?SearchBy=ContactDeveloperId&Search=${DeveloperId}`,
                method: "GET",
            }),
            providesTags: ["Contacts"]
        }),
    }),
    overrideExisting: false
});

export const {
  useGetDataQuery,
  useGetContactsMutation
} = Slice;
