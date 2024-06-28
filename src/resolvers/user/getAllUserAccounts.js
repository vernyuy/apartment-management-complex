"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = exports.request = void 0;
function request(ctx) {
    // add timestamps
    const id = ctx.args.id;
    const keys = [{ id: id }];
    return {
        operation: 'BatchGetItem',
        tables: {
            AcmsDynamoDBTable: {
                keys: keys,
                consistentRead: true,
            },
        },
    };
}
exports.request = request;
function response(ctx) {
    return ctx.result;
}
exports.response = response;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QWxsVXNlckFjY291bnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0QWxsVXNlckFjY291bnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLFNBQWdCLE9BQU8sQ0FDckIsR0FBcUM7SUFFckMsaUJBQWlCO0lBQ2pCLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ3ZCLE1BQU0sSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxQixPQUFPO1FBQ0wsU0FBUyxFQUFFLGNBQWM7UUFDekIsTUFBTSxFQUFFO1lBQ0osaUJBQWlCLEVBQUU7Z0JBQ2pCLElBQUksRUFBRSxJQUFJO2dCQUNWLGNBQWMsRUFBRSxJQUFJO2FBQ3JCO1NBQ0Y7S0FDSixDQUFDO0FBQ0osQ0FBQztBQWZELDBCQWVDO0FBRUQsU0FBZ0IsUUFBUSxDQUN0QixHQUFtRTtJQUVuRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFDcEIsQ0FBQztBQUpELDRCQUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udGV4dCwgRHluYW1vREJCYXRjaEdldEl0ZW1SZXF1ZXN0IH0gZnJvbSAnQGF3cy1hcHBzeW5jL3V0aWxzJztcbmltcG9ydCB7IFF1ZXJ5R2V0VXNlckFjY291bnRBcmdzLCBVc2VyIH0gZnJvbSAnLi4vLi4vdHlwZXMvYXBwc3luYyc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0KFxuICBjdHg6IENvbnRleHQ8UXVlcnlHZXRVc2VyQWNjb3VudEFyZ3M+LFxuKTogRHluYW1vREJCYXRjaEdldEl0ZW1SZXF1ZXN0IHtcbiAgLy8gYWRkIHRpbWVzdGFtcHNcbiAgY29uc3QgaWQgPSBjdHguYXJncy5pZDtcbiAgY29uc3Qga2V5cyA9IFt7IGlkOiBpZCB9XTtcbiAgcmV0dXJuIHtcbiAgICBvcGVyYXRpb246ICdCYXRjaEdldEl0ZW0nLFxuICAgIHRhYmxlczoge1xuICAgICAgICBBY21zRHluYW1vREJUYWJsZToge1xuICAgICAgICAgIGtleXM6IGtleXMsXG4gICAgICAgICAgY29uc2lzdGVudFJlYWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzcG9uc2UoXG4gIGN0eDogQ29udGV4dDxRdWVyeUdldFVzZXJBY2NvdW50QXJncywgb2JqZWN0LCBvYmplY3QsIG9iamVjdCwgVXNlcj4sXG4pIHtcbiAgcmV0dXJuIGN0eC5yZXN1bHQ7XG59Il19