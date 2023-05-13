/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.proyecto.segurosbackend.logic;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author jimmy
 */
public class Categoria {
    private int id;
    private String descripcion;
    List<Cobertura> coberturas;

    public Categoria() {
    }

    public Categoria(int id, String descripcion, List<Cobertura> coberturas) {
        this.id = id;
        this.descripcion = descripcion;
        this.coberturas = coberturas;
    }

    public Categoria(String descripcion) {
        this.descripcion = descripcion;
        this.coberturas = new ArrayList<>();
    }
    
    

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public List<Cobertura> getCoberturas() {
        return coberturas;
    }

    public void setCoberturas(List<Cobertura> coberturas) {
        this.coberturas = coberturas;
    }
    
    

    
    
}
