package bs.gomoku.serviceLayer.profile;


import jakarta.annotation.Nullable;
import jakarta.persistence.*;


@Entity
public class ProfileEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator = "id_profileSequence")
    @SequenceGenerator(name = "id_profileSequence", allocationSize = 1)
    public String id;
    @Column(length = 40)
    public String userMail;
    @Column(length = 20)
    @Nullable
    public String password;
    @Column(length = 4000)
    public String profileString;
}
