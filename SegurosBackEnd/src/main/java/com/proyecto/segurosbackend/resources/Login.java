/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.proyecto.segurosbackend.resources;

/**
 *
 * @author jimmy
 */
import com.proyecto.segurosbackend.logic.Cliente;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import com.proyecto.segurosbackend.logic.Usuario;
import com.proyecto.segurosbackend.logic.Service;
import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Path("/login")
@PermitAll
public class Login {
    @Context
    HttpServletRequest request;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Cliente login(Usuario usuario) {
        Map<String, String> errores = validar(usuario);
        if (errores.isEmpty()) {
            try {
                Cliente real = Service.instance().usuarioFind(usuario.getCedula(), usuario.getClave());
                if (real != null) {
                    request.getSession(true).setAttribute("user", real);
                    return real;
                } else {
                    errores.put("identificacion", "Usuario o clave incorrectos");
                    errores.put("clave", "Usuario o clave incorrectos");
                    return null;
                }
            } catch (Exception ex) {
                ex.printStackTrace();
                errores.put("identificacion", "Usuario o clave incorrectos");
                errores.put("clave", "Usuario o clave incorrectos");
            }
        } else {
            errores.put("identificacion", "Usuario o clave incorrectos");
            errores.put("clave", "Usuario o clave incorrectos");
        }
        return null;
    }

    @POST
    @Path("/logout")
    public Response logout() {
        HttpSession session = request.getSession(true);
        session.removeAttribute("user");
        session.invalidate();
        return Response.ok().entity("Desconexión exitosa").build();
    }

    Map<String, String> validar(Usuario usuario) {
        Map<String, String> errores = new HashMap<>();
        if (usuario.getCedula().isEmpty()) {
            errores.put("identificacion", "Identificacion requerida");
        }

        if (usuario.getClave().isEmpty()) {
            errores.put("clave", "Clave requerida");
        }
        return errores;
    }

}
