package nl.hu.v1wac.firstapp.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = "/Calculator.do")
public class Calculator extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4822929076452381636L;

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("Running");
		int uitkomst = 0;
		int getal1 = Integer.parseInt(req.getParameter("getal1"));
		int getal2 = Integer.parseInt(req.getParameter("getal2"));
		String knop = req.getParameter("knop");
		if (knop.equals("plus")) {
			uitkomst = (getal1 + getal2);
		}
		if (knop.equals("min")) {
			uitkomst = (getal1 - getal2);
		}
		if (knop.equals("keer")) {
			uitkomst = (getal1 * getal2);
		}
		if (knop.equals("gedeeld door")) {
			uitkomst = (getal1 / getal2);
		}
		PrintWriter out = resp.getWriter();
		resp.setContentType("text/html");
		out.println("<!DOCTYPE html>");
		out.println("<html>");
		out.println(" <title>Uitkomst</title>");
		out.println(" <body>");
		out.println(" <h2>" + getal1 + " " + knop + " " + getal2 + " " + "=" + " " + uitkomst + " " + "!</h2>");
		out.println(" </body>");
		out.println("</html>");
	}
}
