<%@page import="com.progra.guia.logic.Cliente"%>
<%@page import="com.progra.guia.logic.Poliza"%>
<%@page import="com.progra.guia.presentation.administrador.clientes.Model"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>


<%
    Model model = (Model) request.getAttribute("model");
    List<Cliente> clientes = model.getClientes();
%>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <%@ include file="/presentation/Head.jsp" %>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Listado de Clientes y Pólizas</title>
        <!-- Agregar CSS de Bootstrap -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
          <%@ include file="/presentation/Header.jsp" %>
          
        <div class="container ">
            
            <h1 class="mb-4">Administrador - Gestion de clientes </h1>
            
            <div class="header-container2">
                <h2>Listado de Clientes y Pólizas</h2>
                <button class="btn btn-info">
                    <a href="/GuiaDB/presentation/administrador/menu/View.jsp" style="text-decoration: none;">Volver al Menu</a>
                </button>
            </div>
            
            <table class="table table-hover table-bordered">
                <thead class="table-dark">
                    <tr>
                        <th>ID Cliente</th>
                        <th>Nombre</th>
                        <th>Pólizas</th>
                    </tr>
                </thead>
                <tbody>
                     
                    <% for (Cliente cliente : clientes) { %>
                    <tr>
                        <td class="text-center align-middle"><%= cliente.getCedula() %></td>
                        <td class="text-center align-middle"><%= cliente.getNombre() %></td>

                        <td>
                            <table class="table table-hover table-bordered table-sm">
                                <thead class="table-light">
                                    <tr>
                                        <th>ID Póliza</th>
                                        <th>Placa</th>
                                        <th>Fecha Inicio</th>
                                        <th>Plazo de Pago</th>
                                        <th>Auto</th>
                                        <th>Año</th>
                                        <th>Costo Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <% for (Poliza poliza : cliente.getPolizas()) { %>
                                    <tr>
                                        <td><%= poliza.getIdPoliza() %></td>
                                        <td><%= poliza.getPlaca() %></td>
                                        <td><%= poliza.getFechaInicio() %></td>
                                        <td><%= poliza.getPlazoPago() %></td>
                                        <td><%= poliza.getAuto() %></td>
                                        <td><%= poliza.getAnnio() %></td>
                                        <td>₡<%= poliza.getCostoTotal() %></td>
                                    </tr>
                                    <% } %>
                                </tbody>
                            </table>

                        </td>
                    </tr>
                    <% } %>
                    
                </tbody>
            </table>
        </div>
        <%@ include file="/presentation/Footer.jsp" %> 

    </body>
</html>
