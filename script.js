function cadastrarRegistro(nome,fone,cpf,quarto,valorDiaria,dias,pagamento,dataSaida,status) {
    
    // Captura os valores do formulário
    var  nome = document.getElementById("nome").value;
    var  fone = document.getElementById("fone").value;
    var  cpf = document.getElementById("cpf").value;
    var  quarto = document.getElementById("quarto").value;
    var  valorDiaria = document.getElementById("valorDiaria").value;
    var  dias = document.getElementById("dias").value;
    var  pagamento = document.getElementById("pagamento").value;
    var  dataSaida = document.getElementById("dataSaida").value;
    var  status = document.getElementById("status").value;
    
   // validarFormulario();
   
    // Cria um objeto com os dados a serem enviados
    var data = {
        nome: nome,
        fone: fone,
        cpf: cpf,
        quarto: quarto ,
        valorDiaria: valorDiaria,
        dias: dias,
        pagamento: pagamento,
        dataSaida: dataSaida,
        status: status
        
    };

    // Envia os dados para o servidor
    fetch('http://localhost:8080/hotel', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar registro.');
            
        }
        return response.json();
    })
    .then(data => {
        console.log( 'Registro cadastrado com sucesso:', data);
        alert("Cadastro realizado com sucesso !")
        fetchDataAndPopulateTable();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
     
     document.getElementById("nome").value ="";
     document.getElementById("fone").value ="";
     document.getElementById("cpf").value ="";
     document.getElementById("quarto").value ="";
     document.getElementById("valorDiaria").value ="";
     document.getElementById("dias").value ="";
     document.getElementById("pagamento").value ="";
     document.getElementById("dataSaida").value ="";
     document.getElementById("status").value ="";
    // window.location.href = "";
   
}


    function validarFormulario() { 
    
    var nome = document.getElementById('nome').value;
    var fone = document.getElementById('fone').value;
    var cpf = document.getElementById('cpf').value;
    var quarto = document.getElementById('quarto').value;
    var valorDiaria = document.getElementById('valorDiaria').value;
    var dias =  document.getElementById("dias").value;
    var pagamento = document.getElementById('pagamento').value;
    var dataSaida =  document.getElementById("dataSaida").value;
    var status = document.getElementById("status").value; 
    if (nome === '') {
        alert('Por favor, preencha o campo Nome.');
        return false;
    }
    if (fone === '') {
        alert('Por favor, preencha o campo Telefone.');
        return false;
    }
    if (cpf === '') {
        alert('Por favor, preencha o campo cpf.');
        return false;
    }
    if (quarto === '') {
        alert('Por favor, preencha o campo quarto.');
        return false;
    }

    if (valorDiaria === '') {
        alert('Por favor, preencha o campo calor da diária.');        
        return false;
    }
    if (dias === '') {
        alert('Por favor, preencha o campo dias.');
        return false;
    }

    if (pagamento === '') {
        alert('Por favor, preencha o campo pagamento.');
        return false;
    }
    if (dataSaida === '') {
        alert('Por favor, preencha o campo data de saída.');
        return false;
    }
    
    if (status === '') {
        alert('Por favor, preencha o campo status.');
        return false;
    }
    
     cadastrarRegistro(nome,fone,cpf,quarto,valorDiaria,dias,pagamento,dataSaida,status);

    
    return true;
}

  // Função para buscar dados da API e preencher a tabela
  async function fetchDataAndPopulateTable() {
    try {
      // Substitua 'URL_DA_SUA_API' pela URL real da sua API
      const response = await fetch( 'http://localhost:8080/hotel');
      const data = await response.json();

      // Limpa a tabela antes de inserir novos dados
      const tbody = document.querySelector('#tabela tbody');
      tbody.innerHTML = '';

      // Preenche a tabela com os dados recebidos da API
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.dataEntrada}</td>          
          <td><a href="#" onclick = >${item.nome}</a></td>       
          <td>${item.fone}</td>        
          <td>${item.quarto}</td>
          <td>${item.valorDiaria}</td>
          <td>${item.dias}</td>
          <td>${item.total}</td> 
          <td>${item.pagamento}</td> 
          <td>${item.dataSaida}</td> 
          <td>${item.status}</td> `;
          
          tbody.appendChild(row);
      });
    } catch (error) {
      console.error('Erro ao buscar e preencher dados:', error);
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
  // Chama a função para buscar e preencher os dados quando a página carrega
   fetchDataAndPopulateTable();
});
 
function preencherFormulario(user) {
    document.getElementById('id').value = user.id;
    document.getElementById('dataEntrada').value = user.dataEntrada;
    document.getElementById('nome').value = user.nome;
    document.getElementById('fone').value = user.fone;  
    document.getElementById('quarto').value = user.quarto;
    document.getElementById('valorDiaria').value = user.valorDiaria;
    document.getElementById('dias').value = user.dias;
    document.getElementById('total').value = user.total; 
    document.getElementById('pagamento').value = user.pagamento;
    document.getElementById('dataSaida').value = user.dataSaida;
    document.getElementById('status').value = user.status;

 }
 function buscarPorId(id) {
    fetch('http://localhost:8080/hotel/' + id)
      .then(response => response.json())
      .then(user => {
        preencherFormulario(user) ;
      })
      .catch(error => console.error('Error fetching user data:', error));
  }