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
public class Marca {

    private int id;
    private String nombre;
    private List<Modelo> modelos;

    public Marca() {
        this.modelos = new ArrayList<>();
    }

    public Marca(String nombre) {
        this.nombre = nombre;
        this.modelos = new ArrayList<>();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Modelo> getModelos() {
        return modelos;
    }

    public void setModelos(List<Modelo> modelos) {
        this.modelos = modelos;
    }
}
