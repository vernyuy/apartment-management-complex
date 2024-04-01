"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = exports.request = void 0;
const utils_1 = require("@aws-appsync/utils");
const helpers_1 = require("../../lib/helpers");
function request(ctx) {
    // add timestamps
    const item = (0, helpers_1.createItem)(ctx.args.input);
    return {
        operation: 'PutItem',
        key: {
            id: utils_1.util.dynamodb.toDynamoDB(utils_1.util.autoId()),
        },
        attributeValues: utils_1.util.dynamodb.toMapValues({
            publishDate: utils_1.util.time.nowISO8601(),
            ...item,
        }),
    };
}
exports.request = request;
function response(ctx) {
    return ctx.result;
}
exports.response = response;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlVXNlckFjY291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjcmVhdGVVc2VyQWNjb3VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4Q0FBMkU7QUFDM0UsK0NBQStDO0FBRy9DLFNBQWdCLE9BQU8sQ0FDckIsR0FBMkM7SUFFM0MsaUJBQWlCO0lBQ2pCLE1BQU0sSUFBSSxHQUFHLElBQUEsb0JBQVUsRUFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQU0sQ0FBQyxDQUFDO0lBRXpDLE9BQU87UUFDTCxTQUFTLEVBQUUsU0FBUztRQUNwQixHQUFHLEVBQUU7WUFDSCxFQUFFLEVBQUUsWUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzVDO1FBQ0QsZUFBZSxFQUFFLFlBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQ3pDLFdBQVcsRUFBRSxZQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQyxHQUFHLElBQUk7U0FDUixDQUFDO0tBQ0gsQ0FBQztBQUNKLENBQUM7QUFoQkQsMEJBZ0JDO0FBRUQsU0FBZ0IsUUFBUSxDQUN0QixHQUF5RTtJQUV6RSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFDcEIsQ0FBQztBQUpELDRCQUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udGV4dCwgRHluYW1vREJQdXRJdGVtUmVxdWVzdCwgdXRpbCB9IGZyb20gJ0Bhd3MtYXBwc3luYy91dGlscyc7XG5pbXBvcnQgeyBjcmVhdGVJdGVtIH0gZnJvbSAnLi4vLi4vbGliL2hlbHBlcnMnO1xuaW1wb3J0IHsgTXV0YXRpb25DcmVhdGVVc2VyQWNjb3VudEFyZ3MsIFVzZXIgfSBmcm9tICcuLi8uLi90eXBlcy9hcHBzeW5jJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3QoXG4gIGN0eDogQ29udGV4dDxNdXRhdGlvbkNyZWF0ZVVzZXJBY2NvdW50QXJncz4sXG4pOiBEeW5hbW9EQlB1dEl0ZW1SZXF1ZXN0IHtcbiAgLy8gYWRkIHRpbWVzdGFtcHNcbiAgY29uc3QgaXRlbSA9IGNyZWF0ZUl0ZW0oY3R4LmFyZ3MuaW5wdXQhKTtcblxuICByZXR1cm4ge1xuICAgIG9wZXJhdGlvbjogJ1B1dEl0ZW0nLFxuICAgIGtleToge1xuICAgICAgaWQ6IHV0aWwuZHluYW1vZGIudG9EeW5hbW9EQih1dGlsLmF1dG9JZCgpKSxcbiAgICB9LFxuICAgIGF0dHJpYnV0ZVZhbHVlczogdXRpbC5keW5hbW9kYi50b01hcFZhbHVlcyh7XG4gICAgICBwdWJsaXNoRGF0ZTogdXRpbC50aW1lLm5vd0lTTzg2MDEoKSxcbiAgICAgIC4uLml0ZW0sXG4gICAgfSksXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNwb25zZShcbiAgY3R4OiBDb250ZXh0PE11dGF0aW9uQ3JlYXRlVXNlckFjY291bnRBcmdzLCBvYmplY3QsIG9iamVjdCwgb2JqZWN0LCBVc2VyPixcbikge1xuICByZXR1cm4gY3R4LnJlc3VsdDtcbn0iXX0=