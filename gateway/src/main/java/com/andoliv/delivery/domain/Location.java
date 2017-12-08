package com.andoliv.delivery.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Location.
 */
@Entity
@Table(name = "location")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Location implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "street_address", nullable = false)
    private String streetAddress;

    @NotNull
    @Column(name = "number_address", nullable = false)
    private Integer numberAddress;

    @NotNull
    @Column(name = "neighborhood", nullable = false)
    private String neighborhood;

    @Column(name = "postal_code")
    private String postalCode;

    @ManyToOne
    private City city;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public Location streetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
        return this;
    }

    public Integer getNumberAddress() {
        return numberAddress;
    }

    public void setNumberAddress(Integer numberAddress) {
        this.numberAddress = numberAddress;
    }

    public Location numberAddress(Integer numberAddress) {
        this.numberAddress = numberAddress;
        return this;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public Location neighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
        return this;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public Location postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Location city(City city) {
        this.city = city;
        return this;
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
        Location location = (Location) o;
        if (location.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), location.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Location{" +
            "id=" + getId() +
            ", streetAddress='" + getStreetAddress() + "'" +
            ", numberAddress='" + getNumberAddress() + "'" +
            ", neighborhood='" + getNeighborhood() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            "}";
    }
}
