package com.proyecto.segurosbackend;

import com.proyecto.segurosbackend.resources.Actualizacion;
import com.proyecto.segurosbackend.resources.Login;
import com.proyecto.segurosbackend.resources.Polizas;
import com.proyecto.segurosbackend.resources.Registrar;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;


@ApplicationPath("api")
public class JakartaRestConfiguration extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        HashSet<Class<?>> classes = new HashSet<>();
        classes.add(Registrar.class); 
        classes.add(Login.class);
        classes.add(Actualizacion.class);
        classes.add(Polizas.class);
        return classes;
    }      
}
