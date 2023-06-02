/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.proyecto.segurosbackend.resources;

import com.proyecto.segurosbackend.logic.Cliente;
import com.proyecto.segurosbackend.logic.Poliza;
import com.proyecto.segurosbackend.logic.Service;
import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 *
 * @author Lenovo
 */
@Path("/polizas")
@PermitAll
public class Polizas {

    @Context
    HttpServletRequest request;

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public Response obtenerPolizas(Cliente cliente) {
        try {
            // Obtener las pólizas desde el servicio
            return Response.ok(Service.instance().polizaFind(cliente)).build();
        } catch (Exception e) {
            // Manejar cualquier excepción o error que pueda ocurrir durante la obtención de las pólizas
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GET
    @Path("/findPoliza")
    @Produces(MediaType.APPLICATION_JSON)
    public Response obtenerPolizas(@QueryParam("placa") String placa, @QueryParam("cedula") String cedula) {
        try {
            Cliente cliente = (Cliente) request.getSession().getAttribute("user");
            List<Poliza> polizas = cliente.getPolizas();
            for (Poliza poliza : polizas) {
                if (poliza.getPlaca().equals(placa) && cliente.getCedula().equals(cedula)) {
                    return Response.ok(Service.instance().polizaFindByPlaca(placa, cedula)).build();
                }
            }
            // La póliza no fue encontrada, devuelve una respuesta de error
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("La póliza no fue encontrada").build();
        } catch (Exception e) {
            // Manejar cualquier excepción o error que pueda ocurrir durante la obtención de las pólizas
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GET
    @Path("/findUnaPoliza")
    @Produces(MediaType.APPLICATION_JSON)
    public Response obtenerUnaPoliza(@QueryParam("idPoliza") String id) {
        try {
            Cliente cliente = (Cliente) request.getSession().getAttribute("user");
            List<Poliza> polizas = cliente.getPolizas();
            int value = Integer.parseInt(id);
            for (Poliza poliza : polizas) {
                if (poliza.getIdPoliza() == value) {
                    return Response.ok(Service.instance().polizaFindById(id)).build();
                }
            }
            // La póliza no fue encontrada, devuelve una respuesta de error
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("La póliza no fue encontrada").build();
        } catch (Exception e) {
            // Manejar cualquier excepción o error que pueda ocurrir durante la obtención de las pólizas
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GET
    @Path("/PolizaCobertura")
    @Produces(MediaType.APPLICATION_JSON)
    public Response obtenerPolizaCobertura(@QueryParam("idPoliza") String idPoliza) {
        try {
            Cliente cliente = (Cliente) request.getSession().getAttribute("user");
            List<Poliza> polizas = cliente.getPolizas();
            int value = Integer.parseInt(idPoliza);
            for (Poliza poliza : polizas) {
                if (poliza.getIdPoliza() == value) {
                    return Response.ok(Service.instance().coberturaPoliza(Integer.parseInt(idPoliza))).build();
                }
            }
            // La póliza no fue encontrada, devuelve una respuesta de error
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("La póliza no fue encontrada").build();
        } catch (Exception e) {
            // Manejar cualquier excepción o error que pueda ocurrir durante la obtención de las pólizas
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    public static final String LOCATION = "C:/AAA/proyecto/";

    @GET
    @Path("{name}/imagen")
    @Produces("image/png")
    public Response readImage(@PathParam("name") String name) throws IOException {
        File file = new File(LOCATION + name);
        Response.ResponseBuilder response = Response.ok((Object) file);
        return response.build();
    }

}
