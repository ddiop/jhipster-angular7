package com.diop.demo.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.diop.demo.domain.enumeration.CIVILITE;

import com.diop.demo.domain.enumeration.LANGUAGE;

/**
 * A Personne.
 */
@Entity
@Table(name = "personne")
public class Personne implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 2, max = 20)
    @Pattern(regexp = "[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ][a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\\s\\\\'-]{0,18}[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]\\")
    @Column(name = "surnom", length = 20, nullable = false)
    private String surnom;

    @Enumerated(EnumType.STRING)
    @Column(name = "civilite")
    private CIVILITE civilite;

    @Size(min = 2, max = 40)
    @Pattern(regexp = "[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ][a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\\s\\\\'-]{0,18}[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]\\")
    @Column(name = "prenom", length = 40)
    private String prenom;

    @Size(min = 2, max = 40)
    @Pattern(regexp = "[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ][a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\\s\\\\'-]{0,18}[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]\\")
    @Column(name = "nom", length = 40)
    private String nom;

    @Size(max = 254)
    @Column(name = "mail", length = 254)
    private String mail;

    @Size(min = 8, max = 120)
    @Column(name = "jhi_password", length = 120)
    private String password;

    @Column(name = "date_naissance")
    private LocalDate dateNaissance;

    @Min(value = 1)
    @Column(name = "cgu_version")
    private Integer cguVersion;

    @Column(name = "cgu_valide")
    private Boolean cguValide;

    @Column(name = "cgu_date_validation")
    private LocalDate cguDateValidation;

    @Enumerated(EnumType.STRING)
    @Column(name = "langue")
    private LANGUAGE langue;

    @OneToOne
    @JoinColumn(unique = true)
    private Adresse adresseResidence;

    @OneToMany(mappedBy = "personne")
    private Set<Participant> participes = new HashSet<>();
    @ManyToMany
    @JoinTable(name = "personne_device",
               joinColumns = @JoinColumn(name = "personne_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "device_id", referencedColumnName = "id"))
    private Set<Device> devices = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSurnom() {
        return surnom;
    }

    public Personne surnom(String surnom) {
        this.surnom = surnom;
        return this;
    }

    public void setSurnom(String surnom) {
        this.surnom = surnom;
    }

    public CIVILITE getCivilite() {
        return civilite;
    }

    public Personne civilite(CIVILITE civilite) {
        this.civilite = civilite;
        return this;
    }

    public void setCivilite(CIVILITE civilite) {
        this.civilite = civilite;
    }

    public String getPrenom() {
        return prenom;
    }

    public Personne prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public Personne nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getMail() {
        return mail;
    }

    public Personne mail(String mail) {
        this.mail = mail;
        return this;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPassword() {
        return password;
    }

    public Personne password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public Personne dateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
        return this;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public Integer getCguVersion() {
        return cguVersion;
    }

    public Personne cguVersion(Integer cguVersion) {
        this.cguVersion = cguVersion;
        return this;
    }

    public void setCguVersion(Integer cguVersion) {
        this.cguVersion = cguVersion;
    }

    public Boolean isCguValide() {
        return cguValide;
    }

    public Personne cguValide(Boolean cguValide) {
        this.cguValide = cguValide;
        return this;
    }

    public void setCguValide(Boolean cguValide) {
        this.cguValide = cguValide;
    }

    public LocalDate getCguDateValidation() {
        return cguDateValidation;
    }

    public Personne cguDateValidation(LocalDate cguDateValidation) {
        this.cguDateValidation = cguDateValidation;
        return this;
    }

    public void setCguDateValidation(LocalDate cguDateValidation) {
        this.cguDateValidation = cguDateValidation;
    }

    public LANGUAGE getLangue() {
        return langue;
    }

    public Personne langue(LANGUAGE langue) {
        this.langue = langue;
        return this;
    }

    public void setLangue(LANGUAGE langue) {
        this.langue = langue;
    }

    public Adresse getAdresseResidence() {
        return adresseResidence;
    }

    public Personne adresseResidence(Adresse adresse) {
        this.adresseResidence = adresse;
        return this;
    }

    public void setAdresseResidence(Adresse adresse) {
        this.adresseResidence = adresse;
    }

    public Set<Participant> getParticipes() {
        return participes;
    }

    public Personne participes(Set<Participant> participants) {
        this.participes = participants;
        return this;
    }

    public Personne addParticipe(Participant participant) {
        this.participes.add(participant);
        participant.setPersonne(this);
        return this;
    }

    public Personne removeParticipe(Participant participant) {
        this.participes.remove(participant);
        participant.setPersonne(null);
        return this;
    }

    public void setParticipes(Set<Participant> participants) {
        this.participes = participants;
    }

    public Set<Device> getDevices() {
        return devices;
    }

    public Personne devices(Set<Device> devices) {
        this.devices = devices;
        return this;
    }

    public Personne addDevice(Device device) {
        this.devices.add(device);
        device.getPersonne(nom)S().add(this);
        return this;
    }

    public Personne removeDevice(Device device) {
        this.devices.remove(device);
        device.getPersonne(nom)S().remove(this);
        return this;
    }

    public void setDevices(Set<Device> devices) {
        this.devices = devices;
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
        Personne personne = (Personne) o;
        if (personne.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), personne.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Personne{" +
            "id=" + getId() +
            ", surnom='" + getSurnom() + "'" +
            ", civilite='" + getCivilite() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", nom='" + getNom() + "'" +
            ", mail='" + getMail() + "'" +
            ", password='" + getPassword() + "'" +
            ", dateNaissance='" + getDateNaissance() + "'" +
            ", cguVersion=" + getCguVersion() +
            ", cguValide='" + isCguValide() + "'" +
            ", cguDateValidation='" + getCguDateValidation() + "'" +
            ", langue='" + getLangue() + "'" +
            "}";
    }
}
