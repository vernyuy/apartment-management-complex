"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = exports.request = void 0;
const utils_1 = require("@aws-appsync/utils");
const helpers_1 = require("../../lib/helpers");
function request(ctx) {
    // add timestamps
    const item = (0, helpers_1.createItem)(ctx.args.input);
    return {
        operation: "PutItem",
        key: utils_1.util.dynamodb.toMapValues({
            PK: `APARTMENT#${item.apartmentId}`,
            SK: `FEEDBACK#${utils_1.util.autoId()}`,
        }),
        attributeValues: utils_1.util.dynamodb.toMapValues({
            publishedOn: utils_1.util.time.nowISO8601(),
            ENTITY: "FEEDBACK",
            ...item,
        }),
    };
}
exports.request = request;
function response(ctx) {
    return ctx.result;
}
exports.response = response;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhdmVGZWVkYmFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxlYXZlRmVlZGJhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOENBQTJFO0FBQzNFLCtDQUErQztBQUcvQyxTQUFnQixPQUFPLENBQ3JCLEdBQXVDO0lBRXZDLGlCQUFpQjtJQUNqQixNQUFNLElBQUksR0FBRyxJQUFBLG9CQUFVLEVBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFNLENBQUMsQ0FBQztJQUV6QyxPQUFPO1FBQ0wsU0FBUyxFQUFFLFNBQVM7UUFDcEIsR0FBRyxFQUFFLFlBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQzdCLEVBQUUsRUFBRSxhQUFhLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbkMsRUFBRSxFQUFFLFlBQVksWUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO1NBQ2hDLENBQUM7UUFFRixlQUFlLEVBQUUsWUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7WUFDekMsV0FBVyxFQUFFLFlBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25DLE1BQU0sRUFBRSxVQUFVO1lBQ2xCLEdBQUcsSUFBSTtTQUNSLENBQUM7S0FDSCxDQUFDO0FBQ0osQ0FBQztBQW5CRCwwQkFtQkM7QUFFRCxTQUFnQixRQUFRLENBQ3RCLEdBQW1GO0lBRW5GLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUNwQixDQUFDO0FBSkQsNEJBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250ZXh0LCBEeW5hbW9EQlB1dEl0ZW1SZXF1ZXN0LCB1dGlsIH0gZnJvbSBcIkBhd3MtYXBwc3luYy91dGlsc1wiO1xuaW1wb3J0IHsgY3JlYXRlSXRlbSB9IGZyb20gXCIuLi8uLi9saWIvaGVscGVyc1wiO1xuaW1wb3J0IHsgTXV0YXRpb25MZWF2ZUZlZWRiYWNrQXJncywgUmF0aW5nc0FuZEZlZWRiYWNrIH0gZnJvbSBcIi4uLy4uL3R5cGVzL2FwcHN5bmNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3QoXG4gIGN0eDogQ29udGV4dDxNdXRhdGlvbkxlYXZlRmVlZGJhY2tBcmdzPixcbik6IER5bmFtb0RCUHV0SXRlbVJlcXVlc3Qge1xuICAvLyBhZGQgdGltZXN0YW1wc1xuICBjb25zdCBpdGVtID0gY3JlYXRlSXRlbShjdHguYXJncy5pbnB1dCEpO1xuXG4gIHJldHVybiB7XG4gICAgb3BlcmF0aW9uOiBcIlB1dEl0ZW1cIixcbiAgICBrZXk6IHV0aWwuZHluYW1vZGIudG9NYXBWYWx1ZXMoe1xuICAgICAgUEs6IGBBUEFSVE1FTlQjJHtpdGVtLmFwYXJ0bWVudElkfWAsXG4gICAgICBTSzogYEZFRURCQUNLIyR7dXRpbC5hdXRvSWQoKX1gLFxuICAgIH0pLFxuXG4gICAgYXR0cmlidXRlVmFsdWVzOiB1dGlsLmR5bmFtb2RiLnRvTWFwVmFsdWVzKHtcbiAgICAgIHB1Ymxpc2hlZE9uOiB1dGlsLnRpbWUubm93SVNPODYwMSgpLFxuICAgICAgRU5USVRZOiBcIkZFRURCQUNLXCIsXG4gICAgICAuLi5pdGVtLFxuICAgIH0pLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzcG9uc2UoXG4gIGN0eDogQ29udGV4dDxNdXRhdGlvbkxlYXZlRmVlZGJhY2tBcmdzLCBvYmplY3QsIG9iamVjdCwgb2JqZWN0LCBSYXRpbmdzQW5kRmVlZGJhY2s+LFxuKSB7XG4gIHJldHVybiBjdHgucmVzdWx0O1xufVxuIl19