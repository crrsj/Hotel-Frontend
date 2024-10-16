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
          <td><a href="#" onclick="buscarDados(${item.id});">${item.id}</a></td>
          <td>${item.dataEntrada}</td>          
          <td>${item.nome}</td>       
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
 

      async function buscarDados(id) {
        try { 
            // URL da API, substitua pela sua URL
            const response = await fetch(`http://localhost:8080/hotel/${id}`);

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro ao buscar dados');
            }

            // Converte a resposta em JSON
            const data = await response.json();
            openModal();

   

    document.getElementById('id').value = data.id;
    document.getElementById('dataEntrada').value = data.dataEntrada;
    document.getElementById('nome').value = data.nome;
    document.getElementById('fone').value = data.fone;  
    document.getElementById('quarto').value = data.quarto;
    document.getElementById('valorDiaria').value = data.valorDiaria;
    document.getElementById('dias').value = data.dias;
    document.getElementById('total').value = data.total; 
    document.getElementById('pagamento').value = data.pagamento;
    document.getElementById('dataSaida').value = data.dataSaida;
    document.getElementById('status').value = data.status;

 
} catch (error) {
    console.error('Erro:', error);
 }
}
        

  function openModal() {
    
    // Seleciona o modal pelo ID
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    
    // Abre o modal
    myModal.show();

}

async function updateUserData() {    
    const idInput = document.getElementById('id');    
    const foneInput = document.getElementById('fone');
    const pagamentoInput = document.getElementById('pagamento');    
    
      
    const updateId =  idInput.value   
    const updateFone = foneInput.value
    const updatePagamento = pagamentoInput.value    
    
  
    try {
      const response = await fetch(`http://localhost:8080/hotel`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: updateId,        
          fone: updateFone,
          pagamento: updatePagamento
         
          
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }
  
      alert('Dados da reserva atualizados com sucesso!');
      fetchDataAndPopulateTable();          
    } catch (error) {
      console.error(`Erro durante a atualização da reserva: ${error.message}`);
    }
    document.getElementById("nome").value = "";
    document.getElementById("fone").value ="";
    document.getElementById("pagamento").value ="";
    
  }

  async function deletarRegistro(id) {
    try {
      // Substitua 'URL_DA_SUA_API' pela URL real da sua API para deletar
      const response = await fetch(`http://localhost:8080/hotel/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Adicione cabeçalhos adicionais, se necessário
        },
      });
        //alert("Tem certeza que deseja deletar esta resercva?");
      if (response.ok) {
        console.log(`Registro com ID ${id} deletado com sucesso.`);
        // Atualiza a tabela após a exclusão
        fetchDataAndPopulateTable();
      } else {
        console.error('Erro ao deletar registro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao deletar registro:', error);
    }
  }
   