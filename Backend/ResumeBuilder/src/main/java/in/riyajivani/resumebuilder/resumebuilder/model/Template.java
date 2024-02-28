package in.riyajivani.resumebuilder.resumebuilder.model;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "templates")
public class Template {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String url;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_template", joinColumns={@JoinColumn(name = "template_fk")}, inverseJoinColumns ={@JoinColumn(name = "user_fk")})
    private Set<User> users;
    public int getTemplateId() {
        return id;
    }

    public void setTemplateId(int templateId) {
        this.id = templateId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "Template{" +
                "templateId=" + id +
                ", name='" + name + '\'' +
                ", url='" + url + '\'' +
                ", users=" + users +
                '}';
    }
}
