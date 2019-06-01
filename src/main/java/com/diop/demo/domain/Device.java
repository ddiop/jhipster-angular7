package com.diop.demo.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Device.
 */
@Entity
@Table(name = "device")
public class Device implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "uuid")
    private String uuid;

    @Size(max = 10)
    @Pattern(regexp = "0[67][0-9]{8}")
    @Column(name = "numero", length = 10)
    private String numero;

    @Min(value = 0)
    @Max(value = 999)
    @Column(name = "indicatif_international")
    private Integer indicatifInternational;

    @Column(name = "notification_uid")
    private String notificationUid;

    @Size(max = 20)
    @Column(name = "marque", length = 20)
    private String marque;

    @Size(max = 20)
    @Column(name = "model", length = 20)
    private String model;

    @Min(value = 1000)
    @Max(value = 9999)
    @Column(name = "activation_code")
    private Integer activationCode;

    @Min(value = 0)
    @Max(value = 3)
    @Column(name = "activation_tentative")
    private Integer activationTentative;

    @Column(name = "activation_date")
    private ZonedDateTime activationDate;

    @ManyToMany(mappedBy = "devices")
    @JsonIgnore
    private Set<Personne> personnes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUuid() {
        return uuid;
    }

    public Device uuid(String uuid) {
        this.uuid = uuid;
        return this;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getNumero() {
        return numero;
    }

    public Device numero(String numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Integer getIndicatifInternational() {
        return indicatifInternational;
    }

    public Device indicatifInternational(Integer indicatifInternational) {
        this.indicatifInternational = indicatifInternational;
        return this;
    }

    public void setIndicatifInternational(Integer indicatifInternational) {
        this.indicatifInternational = indicatifInternational;
    }

    public String getNotificationUid() {
        return notificationUid;
    }

    public Device notificationUid(String notificationUid) {
        this.notificationUid = notificationUid;
        return this;
    }

    public void setNotificationUid(String notificationUid) {
        this.notificationUid = notificationUid;
    }

    public String getMarque() {
        return marque;
    }

    public Device marque(String marque) {
        this.marque = marque;
        return this;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public String getModel() {
        return model;
    }

    public Device model(String model) {
        this.model = model;
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getActivationCode() {
        return activationCode;
    }

    public Device activationCode(Integer activationCode) {
        this.activationCode = activationCode;
        return this;
    }

    public void setActivationCode(Integer activationCode) {
        this.activationCode = activationCode;
    }

    public Integer getActivationTentative() {
        return activationTentative;
    }

    public Device activationTentative(Integer activationTentative) {
        this.activationTentative = activationTentative;
        return this;
    }

    public void setActivationTentative(Integer activationTentative) {
        this.activationTentative = activationTentative;
    }

    public ZonedDateTime getActivationDate() {
        return activationDate;
    }

    public Device activationDate(ZonedDateTime activationDate) {
        this.activationDate = activationDate;
        return this;
    }

    public void setActivationDate(ZonedDateTime activationDate) {
        this.activationDate = activationDate;
    }

    public Set<Personne> getPersonnes() {
        return personnes;
    }

    public Device personnes(Set<Personne> personnes) {
        this.personnes = personnes;
        return this;
    }

    public Device addPersonne(Personne personne) {
        this.personnes.add(personne);
        personne.getDevices().add(this);
        return this;
    }

    public Device removePersonne(Personne personne) {
        this.personnes.remove(personne);
        personne.getDevices().remove(this);
        return this;
    }

    public void setPersonnes(Set<Personne> personnes) {
        this.personnes = personnes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Device device = (Device) o;
        if (device.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), device.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Device{" +
            "id=" + getId() +
            ", uuid='" + getUuid() + "'" +
            ", numero='" + getNumero() + "'" +
            ", indicatifInternational=" + getIndicatifInternational() +
            ", notificationUid='" + getNotificationUid() + "'" +
            ", marque='" + getMarque() + "'" +
            ", model='" + getModel() + "'" +
            ", activationCode=" + getActivationCode() +
            ", activationTentative=" + getActivationTentative() +
            ", activationDate='" + getActivationDate() + "'" +
            "}";
    }
}
