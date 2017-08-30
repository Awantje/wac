package nl.hu.v1wac.firstapp.model;

import java.util.List;

import nl.hu.v1wac.firstapp.persistence.CountryDAO;

public class WorldService {
	CountryDAO dao = new CountryDAO();
	public List<Country> getAllCountries() {
		return dao.findAll();
	}
	
	public List<Country> get10LargestPopulations() {
		return dao.find10LargestPopulations();
	}

	public List<Country> get10LargestSurfaces() {
		return dao.find10LargestSurfaces();
	}
	
	public Country getCountryByCode(String code) {
	return dao.findByCode(code);
}
	public boolean deleteCountryByCode(String id){
		if (dao.delete(id)){
			return true;
		}
		return false;
	}
	public Country updateCountry(Country country){
		return dao.update(country);
	}
	public Country saveCountry(Country country){
		return dao.save(country);
	}
}