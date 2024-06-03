package in.riyajivani.resumebuilder.resumebuilder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ResumebuilderApplication {

	public static void main(String[] args) {


		String port = System.getenv("PORT");
		if (port == null) {
			port = "8080"; // Default port
		}

		// Set the host and port for the embedded Tomcat server
		System.setProperty("server.port", port);
		System.setProperty("server.address", "0.0.0.0");
		
		SpringApplication.run(ResumebuilderApplication.class, args);
	}

}
