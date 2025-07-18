import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        picture: v.string(),
        subscriptionId: v.optional(v.string()),
    }),

    designs: defineTable({
        name: v.string(),
        width: v.number(),
        height: v.number(),
        jsonTemplete: v.optional(v.any()),
        imagePreview: v.optional(v.string()),
        uid: v.id("users")
    }),

    templates: defineTable({
        name: v.string(),
        imagePreview: v.string(),
        jsonData: v.any(),
        active: v.boolean(),
        width: v.optional(v.number()),
        height: v.optional(v.number()),

    })
})