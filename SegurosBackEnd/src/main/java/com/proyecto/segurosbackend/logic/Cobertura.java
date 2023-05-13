/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.proyecto.segurosbackend.logic;

/**
 *
 * @author jimmy
 */



public class Cobertura {
    private int id;
    private String descripcion;
    private double costoMinimo;
    private double costoPorcentual;
    private Categoria categoria;

  
    public Cobertura() {
    }

    public Cobertura(int id, String descripcion, double costoMinimo, double costoPorcentual) {
        this.id = id;
        this.descripcion = descripcion;
        this.costoMinimo = costoMinimo;
        this.costoPorcentual = costoPorcentual;
    }

    public Cobertura(String descripcion, double costoMinimo, double costoPorcentual) {
        this.descripcion = descripcion;
        this.costoMinimo = costoMinimo;
        this.costoPorcentual = costoPorcentual;
    }
    
    

    public Cobertura(int id, String descripcion, double costoMinimo, double costoPorcentual, Categoria categoria) {
        this.id = id;
        this.descripcion = descripcion;
        this.costoMinimo = costoMinimo;
        this.costoPorcentual = costoPorcentual;
        this.categoria = categoria;
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

    public double getCostoMinimo() {
        return costoMinimo;
    }

    public void setCostoMinimo(double costoMinimo) {
        this.costoMinimo = costoMinimo;
    }

    public double getCostoPorcentual() {
        return costoPorcentual;
    }

    public void setCostoPorcentual(double costoPorcentual) {
        this.costoPorcentual = costoPorcentual;
    }
    

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }


}
