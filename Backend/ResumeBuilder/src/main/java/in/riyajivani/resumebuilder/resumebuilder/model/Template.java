package in.riyajivani.resumebuilder.resumebuilder.model;

import jakarta.persistence.*;

@Entity
@Table(name = "templates")
public class Template {

    @Id
    @Column(name = "tid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int templateId;

    @Column(name = "tname")
    private String name;

    @Column(name ="imageurl")
    private String url;

    public int getTemplateId() {
        return templateId;
    }

    public void setTemplateId(int templateId) {
        this.templateId = templateId;
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

    @Override
    public String toString() {
        return "Template{" +
                "templateId=" + templateId +
                ", name='" + name + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
