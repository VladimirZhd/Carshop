namespace Carshop.Models
{
    public class Pro100DatabaseSettings : IPro100DatabaseSettings
    {
        public string CarsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IPro100DatabaseSettings
    {
        public string CarsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}