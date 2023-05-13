/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.proyecto.segurosbackend.data;

import com.proyecto.segurosbackend.logic.Cliente;
import com.proyecto.segurosbackend.logic.Poliza;
import java.math.BigDecimal;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author ESCINF
 */
public class ClienteDao {

    RelDatabase db;

    public ClienteDao(RelDatabase db) {
        this.db = db;
    }

    public Cliente read(String cedula) throws Exception {
        String sql = "select "
                + "* "
                + "from Cliente e inner join Usuario u on e.usuario=u.cedula "
                + "where e.cedula=?";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setString(1, cedula);
        ResultSet rs = db.executeQuery(stm);
        UsuarioDao usuarioDao = new UsuarioDao(db);
        Cliente c;
        if (rs.next()) {
            c = from(rs, "e");
            c.setUsuario(usuarioDao.from(rs, "u"));
            return c;
        } else {
            throw new Exception("Empleado no Existe");
        }
    }

    public Cliente from(ResultSet rs, String alias) {
        try {
            Cliente e = new Cliente();
            e.setCedula(rs.getString(alias + ".cedula"));
            e.setNombre(rs.getString(alias + ".nombre"));
            return e;
        } catch (SQLException ex) {
            return null;
        }
    }

    public void update(Cliente e) throws Exception {
        String sql = "update "
                + "Cliente "
                + "set nombre=? "
                + "where cedula=?";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setString(1, e.getNombre());
        stm.setString(2, e.getCedula());
        int count = db.executeUpdate(stm);
        if (count == 0) {
            throw new Exception("Cliente no existe");
        }
    }

    
    public List<Cliente> obtenerTodosLosClientes() {
        List<Cliente> clientes = new ArrayList<>();
        try {
            String sql = "SELECT * FROM Cliente c";
            PreparedStatement stm = db.prepareStatement(sql);
            ResultSet rs = db.executeQuery(stm);

            while (rs.next()) {
                Cliente cliente = from(rs, "c");
                cliente.setPolizas(obtenerPolizasPorClienteId(cliente.getCedula()));
                clientes.add(cliente);
            }
        } catch (SQLException ex) {
            ex.printStackTrace(); // Imprimir el seguimiento de la excepción
        }
        return clientes;
    }

    private List<Poliza> obtenerPolizasPorClienteId(String clienteCedula) {
        List<Poliza> polizas = new ArrayList<>();
        try {
            String sql = "SELECT * FROM Poliza p WHERE p.cliente = ?";
            PreparedStatement stm = db.prepareStatement(sql);
            stm.setString(1, clienteCedula);
            ResultSet rs = db.executeQuery(stm);

            while (rs.next()) {
                Poliza poliza = fromPoliza(rs, "p");
                polizas.add(poliza);
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return polizas;
    }

    private Poliza fromPoliza(ResultSet rs, String prefix) throws SQLException {
        int idPoliza = rs.getInt(prefix + ".id_poliza");
        String placa = rs.getString(prefix + ".placa");
        Date fechaInicio = rs.getDate(prefix + ".fecha_inicio");
        String plazoPago = rs.getString(prefix + ".plazo_pago");
        String auto = rs.getString(prefix + ".auto");
        String annio = rs.getString(prefix + ".annio");
        BigDecimal costoTotal = rs.getBigDecimal(prefix + ".costo_total");

        Poliza poliza = new Poliza(idPoliza, placa, fechaInicio, plazoPago, auto, annio, costoTotal);
        
        
        return poliza;
    }

    public void agregarCliente(Cliente cliente) {
        try {
            String query = "INSERT INTO Cliente(cedula, nombre, usuario) VALUES (?, ?, ?)";
            PreparedStatement statement = db.prepareStatement(query);
            statement.setString(1, cliente.getCedula());
            statement.setString(2, cliente.getNombre());
            statement.setString(3, cliente.getUsuario().getCedula());
            statement.executeUpdate();
        } catch (SQLException ex) {

        }
    }

}
