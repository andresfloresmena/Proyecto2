/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.proyecto.segurosbackend.resources;

import com.proyecto.segurosbackend.logic.Categoria;
import com.proyecto.segurosbackend.logic.Cliente;
import jakarta.ws.rs.Path;
import com.proyecto.segurosbackend.logic.Cobertura;
import com.proyecto.segurosbackend.logic.Marca;
import com.proyecto.segurosbackend.logic.Modelo;
import com.proyecto.segurosbackend.logic.Poliza;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import com.proyecto.segurosbackend.logic.Service;
import jakarta.annotation.security.PermitAll;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;


/**
 *
 * @author jimmy
 */

@Path("/administrador")
@PermitAll
public class Administrador {

    @POST
    @Path("/agregarCobertura")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response agregarCobertura(@QueryParam("categoria") String id, Cobertura cobertura) {
        try {
            int ident = Integer.parseInt(id);
            Service.instance().agregarCobertura(ident, cobertura);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @POST
    @Path("/agregarCategoria")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response agregarCategoria(Categoria categoria) {
        try {
            // Agregar nueva categoría con el servicio
            Service.instance().agregarCategoria(categoria);
            return Response.ok().build();
        } catch (Exception e) {
            // Manejar cualquier excepción o error que pueda ocurrir durante la agregación de la categoría
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    
    
    @GET
    @Path("/obtenerCategorias")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response obtenerCategorias() {
        try {
            // Obtener las categorías desde el servicio
            return Response.ok(Service.instance().allCategorias()).build();
        } catch (Exception e) {
            // Manejar cualquier excepción o error que pueda ocurrir durante la obtención de las categorías
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GET
    @Path("/clientesYPolizas")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response obtenerClientesPolizas() {
        try {
            // Obtener las categorías desde el servicio
            return Response.ok(Service.instance().allClientes()).build();
        } catch (Exception e) {
            // Manejar cualquier excepción o error que pueda ocurrir durante la obtención de las categorías
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GET
    @Path("/obtenerMarcas")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response obtenerMarcas() {
        try {
            // Obtener las categorías desde el servicio
            return Response.ok(Service.instance().allAutos()).build();
        } catch (Exception e) {
            // Manejar cualquier excepción o error que pueda ocurrir durante la obtención de las categorías
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @POST
    @Path("/agregarMarca")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response agregarMarca(Marca marca) {
        try {
            // Agregar nueva cobertura con el servicio
            Service.instance().agregarAuto(marca);
            return Response.ok().build();
        } catch (Exception e) {
            // Manejar cualquier excepción o error que pueda ocurrir durante la agregación de la cobertura
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @POST
    @Path("/agregarModelo")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response agregarModelo(@QueryParam("marca") String id, Modelo modelo) {
        try {
            int ident = Integer.parseInt(id);
            Service.instance().agregarModelo(modelo, ident);
            return Response.ok().build();
        } catch (Exception e) {
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

    
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Path("{name}/flag")
    public void createImage(@PathParam("name") String name, @FormParam("flag") InputStream in) {
        try {
            OutputStream out = new FileOutputStream(new File(LOCATION + name));
            in.transferTo(out);
            out.close();
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }
    
    @GET
    @Path("/PolizaCobertura")
    @Produces(MediaType.APPLICATION_JSON)
    public Response obtenerPolizaCobertura(@QueryParam("idPoliza") String idPoliza) {
        try {
            
                
            return Response.ok(Service.instance().coberturaPoliza(Integer.parseInt(idPoliza))).build();
                
            
            
        } catch (Exception e) {
            // Manejar cualquier excepción o error que pueda ocurrir durante la obtención de las pólizas
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

}
