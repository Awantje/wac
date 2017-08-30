package nl.hu.v1wac.firstapp.webservices;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

import javax.json.*;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;

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
	@Path("/updateland/{id}")
	public Response deleteCountryByCode(@PathParam("id") String id){
		WorldService service = ServiceProvider.getWorldService();
		if (service.deleteCountryByCode(id)){
		return Response.ok().build();}
		return Response.ok().build();
	}
	@PUT
	@Path("/updateland")
	@Produces("application/json")
	public String updateCountry(InputStream is){
		WorldService service = ServiceProvider.getWorldService();
		JsonObject object = Json.createReader(is).readObject();
		String code = object.getString("Code");
		String iso = object.getString("Iso3");
		String name = object.getString("Naam");
		String cont = object.getString("Continent");
		String capi = object.getString("Capital");
		String regi = object.getString("Region");
		String surf = object.getString("Surface");
		String popu = object.getString("Population");
		String gove = object.getString("Government");
		String lat = object.getString("Lat");
		String lng = object.getString("lng");		
		Country country = new Country(code, iso, name, cont, capi, regi, Double.parseDouble(surf) ,  Integer.parseInt(popu), gove,  Double.parseDouble(lat),  Double.parseDouble(lng));
		service.updateCountry(country);
		return countryToJson(country).build().toString();
	}
	@POST
	@Path("/addland")
	@Produces("application/json")
	public String addCountry(InputStream is){
		WorldService service = ServiceProvider.getWorldService();
		JsonObject object = Json.createReader(is).readObject();
		String code = object.getString("Code");
		String iso = object.getString("Iso3");
		String name = object.getString("Naam");
		String cont = object.getString("Continent");
		String capi = object.getString("Capital");
		String regi = object.getString("Region");
		String surf = object.getString("Surface");
		String popu = object.getString("Population");
		String gove = object.getString("Government");
		String lat = object.getString("Lat");
		String lng = object.getString("lng");
		Country country = new Country(code, iso, name, cont, capi, regi, Double.parseDouble(surf) ,  Integer.parseInt(popu), gove,  Double.parseDouble(lat),  Double.parseDouble(lng));
		service.saveCountry(country);
		return countryToJson(country).build().toString();
	}
	private JsonObjectBuilder countryToJson(Country c){
		JsonObjectBuilder job = Json.createObjectBuilder();
		job.add("Code", c.getCode());
		job.add("Iso3", c.getIso3Code());
		job.add("Naam", c.getName());
		job.add("Continent", c.getContinent());
		job.add("Capital", c.getCapital());
		job.add("Region", c.getRegion());
		job.add("Surface", c.getSurface());
		job.add("Population", c.getPopulation());
		job.add("Government", c.getGovernment());
		job.add("Lat", c.getLatitude());
		job.add("lng", c.getLongitude());
		return job;
	}
}
