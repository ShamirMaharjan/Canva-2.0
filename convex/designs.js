import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const CreateNewDesign = mutation({
    args: {
        name: v.string(),
        width: v.number(),
        height: v.number(),
        uid: v.id("users")

    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert("designs", {
            name: args.name,
            width: args.width,
            height: args.height,
            uid: args.uid
        });

        return result;
    }
});

export const GetDesign = query({
    args: {
        id: v.id("designs")
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.get(args.id);
        return result;
    }
})

export const saveDesign = mutation({
    args: {
        id: v.id("designs"),
        jsonDesign: v.any(),
        imagePreview: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args.id, {
            jsonTemplete: args.jsonDesign,
            imagePreview: args?.imagePreview
        })
        return result;
    }
})

export const GetUserDesigns = query({
    args: {
        uid: v.id("users")
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query("designs")
            .filter(q => q.eq(q.field("uid"), args.uid))
            .collect();

        return result;
    }
})

export const CreateDesignFromTemplate = mutation({
    args: {
        name: v.string(),
        width: v.number(),
        height: v.number(),
        imagePreview: v.string(), // base64 encoded image preview of the design, will be used to display in the design list and in the design preview
        uid: v.id("users"),
        jsonTemplete: v.any()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert("designs", {
            name: args.name,
            width: args.width,
            height: args.height,
            uid: args.uid,
            jsonTemplete: args?.jsonTemplete,
            imagePreview: args?.imagePreview
        })
        return result;
    }
})