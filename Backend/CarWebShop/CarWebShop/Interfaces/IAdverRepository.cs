﻿using CarWebShop.Models;

namespace CarWebShop.Interfaces
{
    public interface IAdverRepository
    {

        ICollection<Advertisement> GetAdvertisements();
    }
}
