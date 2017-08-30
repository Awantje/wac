package nl.hu.v1wac.firstapp.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import nl.hu.v1wac.firstapp.model.Country;

public class CountryDAO extends BaseDAO {
	public Country save(Country country) {
		try (Connection conn = super.getConnection()) {
			final String INSERT = "INSERT INTO \"country\" (code, name, continent, region, surfacearea, population, governmentform, code2, latitude, longitude, capital) VALUES (?, ?, CAST(? AS continenttype), ?, ?, ?, ?, ?, ?, ?,?)";
			PreparedStatement ps = conn.prepareStatement(INSERT);
			ps.setString(1, country.getCode());
			ps.setString(2, country.getName());
			ps.setString(3, country.getContinent());
			ps.setString(4, country.getRegion());
			ps.setDouble(5, country.getSurface());
			ps.setInt(6, country.getPopulation());
			ps.setString(7, country.getGovernment());
			ps.setString(8, country.getIso3Code());
			ps.setDouble(9, country.getLatitude());
			ps.setDouble(10, country.getLongitude());
			ps.setString(11, country.getCapital());
			ps.executeUpdate();
			ps.close();
			return country;
		} catch (SQLException e) {
			// e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	public List<Country> findAll() {
		return selectCountries("SELECT * FROM \"country\"");
	}
//werkende
	public Country findByCode(String code) {
		System.out.println("findbycode");
		try (Connection con = super.getConnection()) {
		final String SELECT = "SELECT * FROM country WHERE CODE=?";
		PreparedStatement ps = con.prepareStatement(SELECT);
		ResultSet dbResultSet = ps.executeQuery();
		String iso2Code = dbResultSet.getString("code");
		String iso3Code = dbResultSet.getString("ISO3");
		String name = dbResultSet.getString("name");
		String capital = dbResultSet.getString("capital");
		String continent = dbResultSet.getString("continent");
		String region = dbResultSet.getString("region");
		double surface = dbResultSet.getDouble("surfacearea");
		int population = dbResultSet.getInt("population");
		String government = dbResultSet.getString("governmentform");
		Double latitude = dbResultSet.getDouble("latitude");
		Double longitude = dbResultSet.getDouble("longitude");
		Country land = new Country(iso2Code, iso3Code, name, continent, capital, region, surface, population,
				government, latitude, longitude);
		System.out.println(land);
		return land;
		} catch (SQLException e) {
			// e.printStackTrace();
			throw new RuntimeException(e);
		}

	}

	public List<Country> find10LargestPopulations() {
		List<Country> allCountries = selectCountries("SELECT * FROM \"country\"");
		Collections.sort(allCountries, new Comparator<Country>() {
			public int compare(Country c1, Country c2) {
				return c2.getPopulation() - c1.getPopulation();
			};
		});
		return allCountries.subList(0, 10);

	}

	public List<Country> find10LargestSurfaces() {
		List<Country> country = selectCountries("SELECT * FROM \"country\"");
		Collections.sort(country, new Comparator<Country>() {
			public int compare(Country c1, Country c2) {
				return (int) (c2.getSurface() - c1.getSurface());
			};
		});
		return country.subList(0, 10);
	}

	public Country update(Country country) {
		try (Connection conn = super.getConnection()) {
			final String UPDATE = "UPDATE country SET name=?, continent=CAST(? AS continenttype), region=?, surfacearea=?, population=?, governmentform=?, latitude=?, longitude=?, capital=? WHERE code=?";
			System.out.println(country.toString());
			PreparedStatement ps = conn.prepareStatement(UPDATE);
			ps.setString(1, country.getName());
			ps.setString(2, country.getContinent());
			ps.setString(3, country.getRegion());
			ps.setDouble(4, country.getSurface());
			ps.setInt(5, country.getPopulation());
			ps.setString(6, country.getGovernment());
			ps.setDouble(7, country.getLatitude());
			ps.setDouble(8, country.getLongitude());
			ps.setString(9, country.getCapital());
			ps.setString(10, country.getCode());
			ps.executeUpdate();
			ps.close();
			return country;
		} catch (SQLException e) {
			// e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	public boolean delete(String id) {
		try (Connection conn = super.getConnection()) {
			final String DELETE = "DELETE FROM \"country\" WHERE code=?";
			PreparedStatement ps = conn.prepareStatement(DELETE);
			ps.setString(1, id);
			return true;
		} catch (SQLException e) {
			// e.printStackTrace();
			throw new RuntimeException(e);
		}
		
	}
//werkende
	private List<Country> selectCountries(String query) {
		List<Country> results = new ArrayList<Country>();
		try (Connection con = super.getConnection()) {
			PreparedStatement pstmt = con.prepareStatement(query);
			ResultSet dbResultSet = pstmt.executeQuery();
			while (dbResultSet.next()) {
				String iso2Code = dbResultSet.getString("code");

				String iso3Code = dbResultSet.getString("code2");

				String name = dbResultSet.getString("name");

				String capital = dbResultSet.getString("capital");

				String continent = dbResultSet.getString("continent");

				String region = dbResultSet.getString("region");

				double surface = dbResultSet.getDouble("surfacearea");

				int population = dbResultSet.getInt("population");

				String government = dbResultSet.getString("governmentform");

				Double latitude = dbResultSet.getDouble("latitude");

				Double longitude = dbResultSet.getDouble("longitude");

				Country land = new Country(iso2Code, iso3Code, name, continent, capital, region, surface, population,
						government, latitude, longitude);
				results.add(land);
			}
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		}
		return results;
	}
}