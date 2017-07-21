package nl.hu.v1wac.firstapp.webservices;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import nl.hu.v1wac.firstapp.model.Country;
import nl.hu.v1wac.firstapp.model.ServiceProvider;
import nl.hu.v1wac.firstapp.model.WorldService;

@Path("/countries")
public class WorldResource {
	@GET
	@Produces("application/json")
	public String getCountries() {
		WorldService service = ServiceProvider.getWorldService();
		JsonArrayBuilder jab = Json.createArrayBuilder();
		for (Country o : service.getAllCountries()) {
			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("Code", o.getCode());
			job.add("Iso3", o.getIso3Code());
			job.add("Naam", o.getName());
			job.add("Continent", o.getContinent());
			job.add("Capital", o.getCapital());
			job.add("Region", o.getRegion());
			job.add("Surface", o.getSurface());
			job.add("Population", o.getPopulation());
			job.add("Government", o.getGovernment());
			job.add("Lat", o.getLatitude());
			job.add("lng", o.getLongitude());
			jab.add(job);
		}
		JsonArray array = jab.build();
		return array.toString();
	}
	@GET
	@Path("{id}")
	@Produces("application/json")
	public String getCountries(@PathParam("id") String id){
		WorldService service = ServiceProvider.getWorldService();
		JsonArrayBuilder jab = Json.createArrayBuilder();
		for (Country o : service.getAllCountries()) {
			if (o.getCode().equals(id)){
			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("Code", o.getCode());
			job.add("Iso3", o.getIso3Code());
			job.add("Naam", o.getName());
			job.add("Continent", o.getContinent());
			job.add("Capital", o.getCapital());
			job.add("Region", o.getRegion());
			job.add("Surface", o.getSurface());
			job.add("Population", o.getPopulation());
			job.add("Government", o.getGovernment());
			job.add("Lat", o.getLatitude());
			job.add("lng", o.getLongitude());
			jab.add(job);
			}
		}
		JsonArray array = jab.build();
		return array.toString();
	}
	@GET
	@Path("/largestsurfaces")
	@Produces("application/json")
	public String getCountriesBySurface(){
		JsonObjectBuilder job = Json.createObjectBuilder();
		WorldService service = ServiceProvider.getWorldService();
		JsonArrayBuilder jab = Json.createArrayBuilder();
		ArrayList<Country> countries = new ArrayList<Country>();
		for (Country o : service.getAllCountries()) {
			countries.add(o);
			Collections.sort(countries, new Comparator<Country>() {
			    @Override
			    public int compare(Country c1, Country c2) {
			        if (c1.getSurface() < c2.getSurface())
			            return 1;
			        if (c1.getSurface() > c2.getSurface())
			            return -1;
			        return 0;
			    }
			});
			
			}		
		for (Country c : countries.subList(0, 10)){
		job.add("Naam", c.getName());
		jab.add(job);}
		JsonArray array = jab.build();
		return array.toString();
	}
	@GET
	@Path("/largestpopulations")
	@Produces("application/json")
	public String getCountriesByPop(){
		JsonObjectBuilder job = Json.createObjectBuilder();
		WorldService service = ServiceProvider.getWorldService();
		JsonArrayBuilder jab = Json.createArrayBuilder();
		ArrayList<Country> countries = new ArrayList<Country>();
		for (Country o : service.getAllCountries()) {
			countries.add(o);
			Collections.sort(countries, new Comparator<Country>() {
			    @Override
			    public int compare(Country c1, Country c2) {
			        if (c1.getPopulation() < c2.getPopulation())
			            return 1;
			        if (c1.getPopulation() > c2.getPopulation())
			            return -1;
			        return 0;
			    }
			});
			
			}		
		for (Country c : countries.subList(0, 10)){
		job.add("Naam", c.getName());
		jab.add(job);}
		JsonArray array = jab.build();
		return array.toString();
	}
	@DELETE
	@Path("/deleteland")
	@Consumes("application/json")
	public boolean deleteCountryByCode(Country country){
		WorldService service = ServiceProvider.getWorldService();
		return service.deleteCountryByCode(country);
	}
	@PUT
	@Path("/updateland")
	@Produces("application/json")
	@Consumes("application/json")
	public Country updateCountry(Country country){
		WorldService service = ServiceProvider.getWorldService();
		String code = country.getCode();
		service.updateCountry(country);
		return service.getCountryByCode(code);
	}
	@POST
	@Path("/addland")
	@Produces("application/json")
	@Consumes("application/json")
	public Country addCountry(Country country){
		WorldService service = ServiceProvider.getWorldService();
		return service.saveCountry(country);
	}
}
