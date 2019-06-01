package com.diop.demo.domain;



import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ImageBase64.
 */
@Entity
@Table(name = "image_base_64")
public class ImageBase64 implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "chemin")
    private String chemin;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public ImageBase64 name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getChemin() {
        return chemin;
    }

    public ImageBase64 chemin(String chemin) {
        this.chemin = chemin;
        return this;
    }

    public void setChemin(String chemin) {
        this.chemin = chemin;
    }

    public byte[] getImage() {
        return image;
    }

    public ImageBase64 image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public ImageBase64 imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
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
        ImageBase64 imageBase64 = (ImageBase64) o;
        if (imageBase64.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), imageBase64.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ImageBase64{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", chemin='" + getChemin() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            "}";
    }
}
