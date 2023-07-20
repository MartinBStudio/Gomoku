package bs.gomoku.serviceLayer.profile;


import jakarta.annotation.Nullable;
import jakarta.persistence.*;


@Entity
public class ProfileEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator = "id_Sequence")
    @SequenceGenerator(name = "profile_sequence", sequenceName = "ID_SEQ")
    @Column(length = 40)
    public String userMail;
    @Column(length = 20)
    @Nullable
    public String password;
    @Column(length = 5000)
    public String profileString;
}
