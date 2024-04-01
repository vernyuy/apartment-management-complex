"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentEntity = void 0;
class ApartmentEntity {
    constructor({ id, apartmentNumber, buildingId, numberOfRooms, apartmentType, apartmentStatus, kitchen, createdOn, }) {
        this.id = id;
        this.apartmentNumber = apartmentNumber;
        this.buildingId = buildingId;
        this.numberOfRooms = numberOfRooms;
        this.apartmentStatus = apartmentStatus;
        this.apartmentType = apartmentType;
        this.kitchen = kitchen;
        this.createdOn = createdOn;
    }
    key() {
        return {
            PK: `BUILDING#${this.buildingId}`,
            SK: `APARTMENT#${this.id}`,
        };
    }
    toItem() {
        return {
            ...this.key(),
            ENTITY: "APARTMENT",
            id: this.id,
            apartmentNumber: this.apartmentNumber,
            buildingId: this.buildingId,
            numberOfRooms: this.numberOfRooms,
            kitchen: this.kitchen,
            apartmentStatus: this.apartmentStatus,
            apartmentType: this.apartmentType,
            createdOn: this.createdOn,
        };
    }
    graphQLReturn() {
        return {
            id: this.id,
            apartmentNumber: this.apartmentNumber,
            buildingId: this.buildingId,
            numberOfRooms: this.numberOfRooms,
            apartmentType: this.apartmentType,
            kitchen: this.kitchen,
            apartmentStatus: this.apartmentStatus,
            createdOn: this.createdOn,
        };
    }
}
exports.ApartmentEntity = ApartmentEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBhcnRtZW50RW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBhcnRtZW50RW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVdBLE1BQWEsZUFBZTtJQVMxQixZQUFZLEVBQ1YsRUFBRSxFQUNGLGVBQWUsRUFDZixVQUFVLEVBQ1YsYUFBYSxFQUNiLGFBQWEsRUFDYixlQUFlLEVBQ2YsT0FBTyxFQUNQLFNBQVMsR0FDVztRQUNwQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFFRCxHQUFHO1FBQ0QsT0FBTztZQUNMLEVBQUUsRUFBRSxZQUFZLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakMsRUFBRSxFQUFFLGFBQWEsSUFBSSxDQUFDLEVBQUUsRUFBRTtTQUMzQixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU07UUFDSixPQUFPO1lBQ0wsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2IsTUFBTSxFQUFFLFdBQVc7WUFDbkIsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ1gsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDakMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDakMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzFCLENBQUM7SUFDSixDQUFDO0lBQ0QsYUFBYTtRQUNYLE9BQU87WUFDTCxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDWCxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDckMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNqQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDakMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDMUIsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQTlERCwwQ0E4REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbnRlcmZhY2UgQXBhcnRtZW50UGFyYW1ldGVycyB7XG4gIGlkOiBzdHJpbmc7XG4gIGFwYXJ0bWVudE51bWJlcjogc3RyaW5nO1xuICBidWlsZGluZ0lkOiBzdHJpbmc7XG4gIG51bWJlck9mUm9vbXM6IG51bWJlcjtcbiAgYXBhcnRtZW50VHlwZTogc3RyaW5nO1xuICBhcGFydG1lbnRTdGF0dXM6IHN0cmluZztcbiAga2l0Y2hlbjogYm9vbGVhbjtcbiAgY3JlYXRlZE9uOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBBcGFydG1lbnRFbnRpdHkge1xuICBpZDogc3RyaW5nO1xuICBhcGFydG1lbnROdW1iZXI6IHN0cmluZztcbiAgYnVpbGRpbmdJZDogc3RyaW5nO1xuICBudW1iZXJPZlJvb21zOiBudW1iZXI7XG4gIGFwYXJ0bWVudFR5cGU6IHN0cmluZztcbiAgYXBhcnRtZW50U3RhdHVzOiBzdHJpbmc7XG4gIGtpdGNoZW46IGJvb2xlYW47XG4gIGNyZWF0ZWRPbjogc3RyaW5nO1xuICBjb25zdHJ1Y3Rvcih7XG4gICAgaWQsXG4gICAgYXBhcnRtZW50TnVtYmVyLFxuICAgIGJ1aWxkaW5nSWQsXG4gICAgbnVtYmVyT2ZSb29tcyxcbiAgICBhcGFydG1lbnRUeXBlLFxuICAgIGFwYXJ0bWVudFN0YXR1cyxcbiAgICBraXRjaGVuLFxuICAgIGNyZWF0ZWRPbixcbiAgfTogQXBhcnRtZW50UGFyYW1ldGVycykge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLmFwYXJ0bWVudE51bWJlciA9IGFwYXJ0bWVudE51bWJlcjtcbiAgICB0aGlzLmJ1aWxkaW5nSWQgPSBidWlsZGluZ0lkO1xuICAgIHRoaXMubnVtYmVyT2ZSb29tcyA9IG51bWJlck9mUm9vbXM7XG4gICAgdGhpcy5hcGFydG1lbnRTdGF0dXMgPSBhcGFydG1lbnRTdGF0dXM7XG4gICAgdGhpcy5hcGFydG1lbnRUeXBlID0gYXBhcnRtZW50VHlwZTtcbiAgICB0aGlzLmtpdGNoZW4gPSBraXRjaGVuO1xuICAgIHRoaXMuY3JlYXRlZE9uID0gY3JlYXRlZE9uO1xuICB9XG5cbiAga2V5KCkge1xuICAgIHJldHVybiB7XG4gICAgICBQSzogYEJVSUxESU5HIyR7dGhpcy5idWlsZGluZ0lkfWAsXG4gICAgICBTSzogYEFQQVJUTUVOVCMke3RoaXMuaWR9YCxcbiAgICB9O1xuICB9XG5cbiAgdG9JdGVtKCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLmtleSgpLFxuICAgICAgRU5USVRZOiBcIkFQQVJUTUVOVFwiLFxuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICBhcGFydG1lbnROdW1iZXI6IHRoaXMuYXBhcnRtZW50TnVtYmVyLFxuICAgICAgYnVpbGRpbmdJZDogdGhpcy5idWlsZGluZ0lkLFxuICAgICAgbnVtYmVyT2ZSb29tczogdGhpcy5udW1iZXJPZlJvb21zLFxuICAgICAga2l0Y2hlbjogdGhpcy5raXRjaGVuLFxuICAgICAgYXBhcnRtZW50U3RhdHVzOiB0aGlzLmFwYXJ0bWVudFN0YXR1cyxcbiAgICAgIGFwYXJ0bWVudFR5cGU6IHRoaXMuYXBhcnRtZW50VHlwZSxcbiAgICAgIGNyZWF0ZWRPbjogdGhpcy5jcmVhdGVkT24sXG4gICAgfTtcbiAgfVxuICBncmFwaFFMUmV0dXJuKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogdGhpcy5pZCxcbiAgICAgIGFwYXJ0bWVudE51bWJlcjogdGhpcy5hcGFydG1lbnROdW1iZXIsXG4gICAgICBidWlsZGluZ0lkOiB0aGlzLmJ1aWxkaW5nSWQsXG4gICAgICBudW1iZXJPZlJvb21zOiB0aGlzLm51bWJlck9mUm9vbXMsXG4gICAgICBhcGFydG1lbnRUeXBlOiB0aGlzLmFwYXJ0bWVudFR5cGUsXG4gICAgICBraXRjaGVuOiB0aGlzLmtpdGNoZW4sXG4gICAgICBhcGFydG1lbnRTdGF0dXM6IHRoaXMuYXBhcnRtZW50U3RhdHVzLFxuICAgICAgY3JlYXRlZE9uOiB0aGlzLmNyZWF0ZWRPbixcbiAgICB9O1xuICB9XG59XG4iXX0=