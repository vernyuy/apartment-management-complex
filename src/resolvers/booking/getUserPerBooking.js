"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = exports.request = void 0;
function request(ctx) {
    const keys = [];
    ctx.prev.result.items.map((item) => {
        keys.push({
            PK: `USER#${item.userId}`,
            SK: `USER#${item.userId}`,
        });
    });
    return {
        operation: "BatchGetItem",
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
    // const items = [];
    // for(const item in ctx.result.get("AcmsDynamoDBTable"))
    //     #set($items= [])
    // #foreach($item in $ctx.result.data.get("AcmsDynamoDBTable"))
    //     #set($user=$ctx.prev.result.items.get($foreach.index))
    //     $util.qr($user.put("user",$item))
    //     $util.qr($items.add($user))
    // #end
    // $util.toJson($items)
    return ctx.result;
}
exports.response = response;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VXNlclBlckJvb2tpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRVc2VyUGVyQm9va2luZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxTQUFnQixPQUFPLENBQUMsR0FBaUI7SUFDdkMsTUFBTSxJQUFJLEdBQWlDLEVBQUUsQ0FBQztJQUM5QyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNSLEVBQUUsRUFBRSxRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDekIsRUFBRSxFQUFFLFFBQVEsSUFBSSxDQUFDLE1BQU0sRUFBRTtTQUMxQixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU87UUFDTCxTQUFTLEVBQUUsY0FBYztRQUN6QixNQUFNLEVBQUU7WUFDTixpQkFBaUIsRUFBRTtnQkFDakIsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsY0FBYyxFQUFFLElBQUk7YUFDckI7U0FDRjtLQUNGLENBQUM7QUFDSixDQUFDO0FBbEJELDBCQWtCQztBQUVELFNBQWdCLFFBQVEsQ0FDdEIsR0FNQztJQUVELG9CQUFvQjtJQUNwQix5REFBeUQ7SUFDekQsdUJBQXVCO0lBQ3ZCLCtEQUErRDtJQUMvRCw2REFBNkQ7SUFDN0Qsd0NBQXdDO0lBQ3hDLGtDQUFrQztJQUNsQyxPQUFPO0lBQ1AsdUJBQXVCO0lBQ3ZCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUNwQixDQUFDO0FBbkJELDRCQW1CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRleHQsIER5bmFtb0RCQmF0Y2hHZXRJdGVtUmVxdWVzdCB9IGZyb20gXCJAYXdzLWFwcHN5bmMvdXRpbHNcIjtcblxuaW1wb3J0IHsgUXVlcnlHZXRBbGxCb29raW5nc1BlckFwYXJ0bWVudEFyZ3MsIFVzZXIgfSBmcm9tIFwiLi4vLi4vdHlwZXMvYXBwc3luY1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdChjdHg6IENvbnRleHQ8YW55Pik6IER5bmFtb0RCQmF0Y2hHZXRJdGVtUmVxdWVzdCB7XG4gIGNvbnN0IGtleXM6IHsgUEs6IHN0cmluZzsgU0s6IHN0cmluZyB9W10gPSBbXTtcbiAgY3R4LnByZXYucmVzdWx0Lml0ZW1zLm1hcCgoaXRlbTogYW55KSA9PiB7XG4gICAga2V5cy5wdXNoKHtcbiAgICAgIFBLOiBgVVNFUiMke2l0ZW0udXNlcklkfWAsXG4gICAgICBTSzogYFVTRVIjJHtpdGVtLnVzZXJJZH1gLFxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIG9wZXJhdGlvbjogXCJCYXRjaEdldEl0ZW1cIixcbiAgICB0YWJsZXM6IHtcbiAgICAgIEFjbXNEeW5hbW9EQlRhYmxlOiB7XG4gICAgICAgIGtleXM6IGtleXMsXG4gICAgICAgIGNvbnNpc3RlbnRSZWFkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzcG9uc2UoXG4gIGN0eDogQ29udGV4dDxcbiAgICBRdWVyeUdldEFsbEJvb2tpbmdzUGVyQXBhcnRtZW50QXJncyxcbiAgICBvYmplY3QsXG4gICAgb2JqZWN0LFxuICAgIG9iamVjdCxcbiAgICBVc2VyXG4gID4sXG4pIHtcbiAgLy8gY29uc3QgaXRlbXMgPSBbXTtcbiAgLy8gZm9yKGNvbnN0IGl0ZW0gaW4gY3R4LnJlc3VsdC5nZXQoXCJBY21zRHluYW1vREJUYWJsZVwiKSlcbiAgLy8gICAgICNzZXQoJGl0ZW1zPSBbXSlcbiAgLy8gI2ZvcmVhY2goJGl0ZW0gaW4gJGN0eC5yZXN1bHQuZGF0YS5nZXQoXCJBY21zRHluYW1vREJUYWJsZVwiKSlcbiAgLy8gICAgICNzZXQoJHVzZXI9JGN0eC5wcmV2LnJlc3VsdC5pdGVtcy5nZXQoJGZvcmVhY2guaW5kZXgpKVxuICAvLyAgICAgJHV0aWwucXIoJHVzZXIucHV0KFwidXNlclwiLCRpdGVtKSlcbiAgLy8gICAgICR1dGlsLnFyKCRpdGVtcy5hZGQoJHVzZXIpKVxuICAvLyAjZW5kXG4gIC8vICR1dGlsLnRvSnNvbigkaXRlbXMpXG4gIHJldHVybiBjdHgucmVzdWx0O1xufVxuIl19