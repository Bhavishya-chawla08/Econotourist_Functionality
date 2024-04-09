<?php
  session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email=$_POST['email'];
    $password = $_POST['pass'];
    
    include("connection.php");
    $stmt=$pdo->prepare('Select * FROM sign_in WHERE email = :email');
    try 
    {
        $stmt->execute(['email'=> $email]);

        if($stmt->rowCount()>0)
        {   
            $user = $stmt->fetch();
            if($password==$user['password'])
            {
                $stmt=$pdo->prepare('Select * FROM login WHERE email = :email');
                $stmt->execute(['email'=> $email]);
                if($stmt->rowCount()>0)
                {
                    $user = $stmt->fetch();
                    if($email==$user['email'])
                    {
                        echo '<script>
                            alert("Login Sucessfull!");
                            window.location.href="/econotourist/mainloginedin.html";
                            </script>';
                    }
                }
                else
                {
                $query = "INSERT INTO login(email,password) VALUES (?, ?)";
                $stmt = $pdo->prepare($query);
                $stmt->execute([$email,$password]);
                echo '<script>
                        alert("Login Sucessfull!");
                        window.location.href="/econotourist/mainloginedin.html";
                        </script>';
                }
            }
            else 
            {
                $_SERVER['email'] = $email;
                $_SERVER['password'] = $password;
                echo '<script>
                        alert("Incorect Password");
                        window.location.href="/econotourist/index.html";
                        </script>';

            }
        }
        else
        {
            $_SERVER['email'] = $email;
            $_SERVER['password'] = $password;
            echo '<script>
                    alert("No account associated with his email");
                    window.location.href="/econotourist/index.html";
                    </script>';

        } 
    } 
    catch(PDOException $e)
    {
        echo "Error: " . $e->getMessage();
    }
}
?>
