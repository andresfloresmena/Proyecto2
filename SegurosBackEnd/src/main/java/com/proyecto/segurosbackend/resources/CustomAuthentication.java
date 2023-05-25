/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.proyecto.segurosbackend.resources;

import com.proyecto.segurosbackend.logic.Cliente;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.security.enterprise.AuthenticationStatus;
import jakarta.security.enterprise.authentication.mechanism.http.HttpAuthenticationMechanism;
import jakarta.security.enterprise.authentication.mechanism.http.HttpMessageContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.util.Arrays;
import java.util.HashSet;

/**
 *
 * @author Lenovo
 */
@ApplicationScoped
public class CustomAuthentication implements HttpAuthenticationMechanism {

    @Override
    public AuthenticationStatus validateRequest(
        HttpServletRequest request,
        HttpServletResponse response,
        HttpMessageContext httpMsgContext){
        Cliente cliente = (Cliente) request.getSession().getAttribute("user");
        if(cliente!=null){
            if(cliente.getUsuario().getTipo() == 1){
                cliente.getUsuario().setRol("CLI");
            }else{
                cliente.getUsuario().setRol("ADM");
            }
        }
        if(cliente!=null)
            return httpMsgContext.notifyContainerAboutLogin(
            new Principal() {@Override public String getName() {return cliente.getCedula();}},
            new HashSet<>(Arrays.asList(new String[]{cliente.getUsuario().getRol()})));
            else
                return httpMsgContext.notifyContainerAboutLogin(
                     new Principal() {@Override public String getName() {return "none";}},
                     new HashSet<>());
        }   
 }
