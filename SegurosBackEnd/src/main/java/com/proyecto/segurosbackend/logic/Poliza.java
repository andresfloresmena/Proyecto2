/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.proyecto.segurosbackend.logic;


/**
 *
 * @author Escinf
 */
import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

public class Poliza {
    private int idPoliza;
    private String placa;
    private Date fechaInicio;
    private String plazoPago;
    private String auto;
    private String annio;
    private BigDecimal costoTotal;
    private Cliente cliente;
    private List<Cobertura> cobertura;
    private int idPolizaModelo;

    public List<Cobertura> getCobertura() {
        return cobertura;
    }

    public void setCobertura(List<Cobertura> cobertura) {
        this.cobertura = cobertura;
    }


    public Poliza(int idPoliza, String placa, Date fechaInicio, String plazoPago, String auto, String annio, BigDecimal costoTotal){
        this.idPoliza = idPoliza;
        this.placa = placa;
        this.fechaInicio = fechaInicio;
        this.plazoPago = plazoPago;
        this.auto = auto;
        this.annio = annio;
        this.costoTotal = costoTotal;
    }
    
   
    
    public Poliza(){
    }

    public int getIdPolizaModelo() {
        return idPolizaModelo;
    }

    public void setIdPolizaModelo(int idPolizaModelo) {
        this.idPolizaModelo = idPolizaModelo;
    }
    
    
    
    public Poliza(String placa, Date fechaInicio, String plazoPago, String auto, String annio, BigDecimal costoTotal, Cliente cliente) {
        this.placa = placa;
        this.fechaInicio = fechaInicio;
        this.plazoPago = plazoPago;
        this.auto = auto;
        this.annio = annio;
        this.costoTotal = costoTotal;
        this.cliente = cliente;
    }
    
     public Poliza(String placa, Date fechaInicio, String plazoPago, String auto, String annio, BigDecimal costoTotal, Cliente cliente, int idPolizaModelo) {
        this.placa = placa;
        this.fechaInicio = fechaInicio;
        this.plazoPago = plazoPago;
        this.auto = auto;
        this.annio = annio;
        this.costoTotal = costoTotal;
        this.cliente = cliente;
        this.idPolizaModelo= idPolizaModelo;
    }
    
     
     
    

    public int getIdPoliza() {
        return idPoliza;
    }

    public void setIdPoliza(int idPoliza) {
        this.idPoliza = idPoliza;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public String getPlazoPago() {
        return plazoPago;
    }

    public void setPlazoPago(String plazoPago) {
        this.plazoPago = plazoPago;
    }

    public String getAuto() {
        return auto;
    }

    public void setAuto(String auto) {
        this.auto = auto;
    }

    public String getAnnio() {
        return annio;
    }

    public void setAnnio(String annio) {
        this.annio = annio;
    }

    public BigDecimal getCostoTotal() {
        return costoTotal;
    }

    public void setCostoTotal(BigDecimal costoTotal) {
        this.costoTotal = costoTotal;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}