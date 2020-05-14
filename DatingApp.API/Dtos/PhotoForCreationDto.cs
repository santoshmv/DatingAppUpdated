using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Dtos
{
    public class PhotoForCreationDto
    {
        public string Url { get; set; }
        public IFormFile File {get; set;}//represents a file sent with HTTP request
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId { get; set; }//will get it from Cloudinary

        public PhotoForCreationDto()
        {
            DateAdded=DateTime.Now;
        }
    }
}