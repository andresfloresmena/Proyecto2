<%@page import="com.progra.guia.logic.Poliza"%>
<%@page import="com.progra.guia.logic.Marca"%>
<%@page import="com.progra.guia.logic.Modelo"%>
<%@page import="com.progra.guia.presentation.cliente.poliza.Model"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%
    Model model = (Model) session.getAttribute("model");
    List<Poliza> polizas = model.getPolizas();
    List<Marca> marcas = model.getMarcas();
%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
        <%@ include file="/presentation/Head.jsp" %>
        <title>Poliza</title> 
    </head>
    <body >
        <%@ include file="/presentation/Header.jsp" %>

        <div class="container my-5">
            <h1 class="mb-4">Póliza</h1>
            <form method="post" action="presentation/cliente/poliza/blank">
                <div class="mb-3">
                    <label for="placa" class="form-label">Placa:</label>
                    <input type="text" class="form-control" id="placa" name="placa" required>
                </div>
                <div class="mb-3">
                    <label for="marcaModelo" class="form-label">Marca-Modelo:</label>
                    <select class="form-select" id="marcaModelo" name="marcaModelo" required>
                        <option value="">Selecciona una opción</option>
                        <% for(Marca m: marcas) { %>
                        <optgroup label="<%= m.getNombre() %>">
                            <% for(Modelo modelo: m.getModelos()) { %>
                            <option value="<%= modelo.getNombre() %>"><%= modelo.getNombre() %></option>
                            <% } %>
                        </optgroup>
                        <% } %>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="año" class="form-label">Año:</label>
                    <input type="number" class="form-control" id="annio" name="annio">
                </div>

                <div class="mb-3">
                    <label for="valor" class="form-label">Valor:</label>
                    <input type="number" class="form-control" id="valor" name="valor">
                </div>
                <div class="mb-3">
                    <label for="modoPago" class="form-label">Modo de pago:</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="trimestral" name="modoPago" value="trimestral">
                        <label class="form-check-label" for="trimestral">Trimestral</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="semestral" name="modoPago" value="semestral" >
                        <label class="form-check-label" for="semestral">Semestral</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="anual" name="modoPago" value="anual" >
                        <label class="form-check-label" for="anual">Anual</label>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Siguiente (Cobertura)</button>
            </form>
        </div>

        <%@ include file="/presentation/Footer.jsp" %>
    </body>
</html>