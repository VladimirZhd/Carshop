using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace Carshop.Models
{
    public class Car
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("Make")]
        [JsonProperty("Make")]
        public string CarMake { get; set; }
        [BsonElement("Model")]
        [JsonProperty("Model")]
        public string CarModel { get; set; }
        public decimal Price { get; set; }
        [BsonElement("Title Type")]
        [JsonProperty("Title Type")]
        public string Title { get; set; }
        public int Mileage { get; set; }
        public int Year { get; set; }
        [BsonElement("Image")]
        [JsonProperty("Image")]
        public string ImgUrl { get; set; }
    }
}