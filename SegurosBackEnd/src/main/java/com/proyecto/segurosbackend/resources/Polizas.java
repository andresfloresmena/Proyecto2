/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.proyecto.segurosbackend.resources;

import com.proyecto.segurosbackend.logic.Cliente;
import com.proyecto.segurosbackend.logic.Poliza;
import com.proyecto.segurosbackend.logic.Service;
import jakarta.annotation.security.PermitAll;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

/**
 *
 * @author Lenovo
 */

@Path("/polizas")
@PermitAll
public class Polizas {
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Poliza> obtenerPolizas(Cliente cliente) {
        try {
            // Obtener las pólizas desde el servicio
            List<Poliza> polizas = Service.instance().polizaFind(cliente);

            return polizas;
        } catch (Exception e) {
            // Manejar cualquier excepción o error que pueda ocurrir durante la obtención de las pólizas
           return null;
        }
    }
}
