package com.proyecto.segurosbackend.resources;

import jakarta.annotation.security.PermitAll;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import com.proyecto.segurosbackend.logic.Cliente;
import com.proyecto.segurosbackend.logic.Service;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.core.Response;


@Path("/registrar")
@PermitAll
public class Registrar {

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public Response agregarCliente(Cliente cliente) throws Exception { 
         try {
            Service.instance().agregarCliente(cliente);
            return Response.ok().build();
        } catch (Exception e) {
            // Manejar cualquier excepción o error que pueda ocurrir durante el registro
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error al registrar el cliente").build();
        }
    }
}