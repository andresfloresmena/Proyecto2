/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.proyecto.segurosbackend.data;


import com.proyecto.segurosbackend.logic.Cliente;
import com.proyecto.segurosbackend.logic.Cobertura;
import com.proyecto.segurosbackend.logic.Poliza;
import java.sql.Array;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;

/**
 *
 * @author ESCINF
 */
public class PolizaDao {

    RelDatabase db;

    public PolizaDao(RelDatabase db) {
        this.db = db;
    }

    public Poliza read(String placa) throws Exception {
        String sql = "select "
                + "* "
                + "from Poliza e inner join Cliente c on e.cliente=c.cedula "
                + "where e.placa=?";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setString(1, placa);
        ResultSet rs = db.executeQuery(stm);
        ClienteDao clienteDao = new ClienteDao(db);
        Poliza c;
        if (rs.next()) {
            c = from(rs, "e");
            c.setCliente(clienteDao.from(rs, "c"));
            return c;
        } else {
            throw new Exception("Poliza no Existe");
        }
    }

    public List<Poliza> findByCliente(String cedula) {
        List<Poliza> resultado = new ArrayList<>();
        try {
            String sql = "select * "
                    + "from "
                    + "Poliza e "
                    + "where e.cliente=?";
            PreparedStatement stm = db.prepareStatement(sql);
            stm.setString(1, cedula);
            ResultSet rs = db.executeQuery(stm);
            while (rs.next()) {
                resultado.add(from(rs, "e"));
            }
        } catch (SQLException ex) {
        }
        return resultado;
    }

    private Poliza from(ResultSet rs, String alias) {
        try {
            Poliza e = new Poliza();
            e.setIdPoliza(rs.getInt(alias + ".id_poliza"));
            e.setPlaca(rs.getString(alias + ".placa"));
            e.setFechaInicio(rs.getDate(alias + ".fecha_inicio"));
            e.setPlazoPago(rs.getString(alias + ".plazo_pago"));
            e.setAuto(rs.getString(alias + ".auto"));
            e.setAnnio(rs.getString(alias + ".annio"));
            e.setCostoTotal(rs.getBigDecimal(alias + ".costo_total"));
            e.setIdPolizaModelo(rs.getInt(alias + ".id_poliza_modelo"));
            return e;
        } catch (SQLException ex) {
            return null;
        }
    }

    public List<Poliza> findByPlaca(String placa, String cedula) {
        List<Poliza> resultado = new ArrayList<>();
        try {
            String sql = "SELECT * "
                    + "FROM Poliza e "
                    + "WHERE e.placa=? and e.cliente=?";
            PreparedStatement stm = db.prepareStatement(sql);
            stm.setString(1, placa);
            stm.setString(2, cedula);
            ResultSet rs = db.executeQuery(stm);
            while (rs.next()) {
                resultado.add(from(rs, "e"));
            }
        } catch (SQLException ex) {
        }
        return resultado;
    }

    public Poliza findById(String id) throws Exception {
        String sql = "select "
                + "* "
                + "from Poliza e inner join Cliente c on e.cliente=c.cedula "
                + "where e.id_poliza=?";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setString(1, id);
        ResultSet rs = db.executeQuery(stm);
        ClienteDao clienteDao = new ClienteDao(db);
        Poliza c;
        List<Cobertura> coberturas = findByIdCobertura(id);
        if (rs.next()) {
            c = from(rs, "e");
            c.setCliente(clienteDao.from(rs, "c"));
            c.setCobertura(coberturas);
            return c;
        } else {
            throw new Exception("Poliza no Existe");
        }
    }

    public List<Cobertura> findByIdCobertura(String id_poliza) throws Exception {
        String sql = "SELECT * "
                + "FROM Poliza p "
                + "INNER JOIN Cobertura_Poliza cp ON p.id_poliza = cp.id_poliza "
                + "INNER JOIN Cobertura c ON c.id = cp.id_cobertura "
                + "WHERE p.id_poliza = ?";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setString(1, id_poliza);
        ResultSet rs = db.executeQuery(stm);
        CategoriaDao categoriaDao = new CategoriaDao(db);
        List<Cobertura> cobertura = new ArrayList();
        while (rs.next()) {
            cobertura.add(categoriaDao.fromCobertura(rs, "c"));
        }
        return cobertura;
    }

    public void agregarPoliza(Poliza poliza) {
        try {
            String query = "Insert into Poliza(placa, fecha_inicio, plazo_pago, auto, annio, costo_total, cliente, id_poliza_modelo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement statement = db.prepareStatement(query);
            statement.setString(1, poliza.getPlaca());
            statement.setDate(2, poliza.getFechaInicio());
            statement.setString(3, poliza.getPlazoPago());
            statement.setString(4, poliza.getAuto());
            statement.setString(5, poliza.getAnnio());
            statement.setBigDecimal(6, poliza.getCostoTotal());
            statement.setString(7, poliza.getCliente().getCedula());
            statement.setInt(8, poliza.getIdPolizaModelo());
            statement.executeUpdate();
        } catch (SQLException ex) {

        }
    }

    public int buscarIdPoliza(Poliza poliza) {
        int idPoliza = -1;

        String query = "SELECT id_poliza FROM Poliza WHERE placa = ? AND plazo_pago = ? AND auto = ? AND annio = ? AND costo_total = ?";

        try (PreparedStatement statement = db.prepareStatement(query)) {
            statement.setString(1, poliza.getPlaca());
            statement.setString(2, poliza.getPlazoPago());
            statement.setString(3, poliza.getAuto());
            statement.setString(4, poliza.getAnnio());
            statement.setBigDecimal(5, poliza.getCostoTotal());

            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    idPoliza = resultSet.getInt("id_poliza");
                    poliza.setIdPoliza(idPoliza);
                }
            }
        } catch (SQLException ex) {
            // Manejo de excepciones, por ejemplo, imprimir la traza de la pila
            ex.printStackTrace();
        }

        return idPoliza;
    }

}
