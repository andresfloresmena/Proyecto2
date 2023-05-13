/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.proyecto.segurosbackend.data;

/**
 *
 * @author jimmy
 */
import com.proyecto.segurosbackend.logic.Cobertura;
import com.proyecto.segurosbackend.logic.Poliza;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class PolizaCoberturaDao {

    RelDatabase db;

    public PolizaCoberturaDao(RelDatabase db) {
        this.db = db;
    }

    public void agregarPolizaCobertura(int poliza, List<Integer> coberturas) throws Exception {
        try {
            String query = "INSERT INTO Cobertura_Poliza(id_cobertura, id_poliza) VALUES (?, ?)";
            PreparedStatement statement = db.prepareStatement(query);

            for (int cobertura : coberturas) {
                statement.setInt(1, cobertura);
                statement.setInt(2, poliza);
                statement.executeUpdate();
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public List<Cobertura> obtenerCoberturasPorIdPoliza(int idPoliza) throws Exception {
        List<Cobertura> coberturas = new ArrayList<>();
        try {
            String sql = "SELECT * FROM Cobertura_Poliza cp "
                    + "JOIN Cobertura c ON cp.id_cobertura = c.id "
                    + "JOIN Poliza p ON cp.id_poliza = p.id_poliza "
                    + "WHERE p.id_poliza = ?";
            PreparedStatement stm = db.prepareStatement(sql);
            stm.setInt(1, idPoliza);
            ResultSet rs = db.executeQuery(stm);

            while (rs.next()) {
                Cobertura cobertura = fromCobertura(rs);
                coberturas.add(cobertura);
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return coberturas;
    }

    private Cobertura fromCobertura(ResultSet rs) throws Exception {
        int id = rs.getInt("id");
        String descripcion = rs.getString("descripcion");
        double costoMinimo = rs.getDouble("costo_minimo");
        double costoPorcentual = rs.getDouble("costo_porcentual");

        Cobertura cobertura = new Cobertura(id, descripcion, costoMinimo, costoPorcentual);
        return cobertura;
    }
}
