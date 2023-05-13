/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.proyecto.segurosbackend.resources;

/**
 *
 * @author jimmy
 */
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import com.proyecto.segurosbackend.logic.Usuario;
import com.proyecto.segurosbackend.logic.Service;
import java.util.HashMap;
import java.util.Map;

@Path("/login")

public class Login {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(Usuario usuario) {
        Map<String,String> errores = validar(usuario);
        if(errores.isEmpty()){
            try {
                Usuario real = Service.instance().usuarioFind(usuario.getCedula(), usuario.getClave());
                switch(real.getTipo()){
                    case 1:
                        return Response.ok(real).build(); // cambiar por lo que quieras devolver
                    case 2:
                        return Response.ok(real).build(); // cambiar por lo que quieras devolver
                    default:
                        return Response.status(Response.Status.BAD_REQUEST).entity("Tipo de usuario no válido").build();
                }
            } catch (Exception ex) {
                errores.put("cedulaFld","Usuario o clave incorrectos");
                errores.put("claveFld","Usuario o clave incorrectos");
                return Response.status(Response.Status.BAD_REQUEST).entity(errores).build();
            }   
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity(errores).build();
        }  
    }

    @POST
    @Path("/logout")
    public Response logout() {
        return Response.ok().entity("Desconexión exitosa").build();
    }

    Map<String,String> validar(Usuario usuario){
        Map<String,String> errores = new HashMap<>();
        if (usuario.getCedula().isEmpty()){
            errores.put("cedulaFld","Cedula requerida");
        }

        if (usuario.getClave().isEmpty()){
            errores.put("claveFld","Clave requerida");
        }
        return errores;
    }

}
