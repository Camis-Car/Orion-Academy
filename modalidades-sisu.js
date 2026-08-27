// Modalidades de referência usadas nos filtros de comparação do site.
// Os códigos permitem encontrar categorias equivalentes nas ofertas do SiSU 2026.
// A elegibilidade final, os documentos e eventuais modalidades próprias são sempre definidos pela instituição.
window.ORION_MODALIDADES_SISU = [
  { codigo: 'LB_PPI', numero: '1', nome: 'Pessoa preta, parda ou indígena; escola pública; renda familiar de até 1 salário mínimo por pessoa', descricao: 'Modalidade de referência 01.' },
  { codigo: 'LB_Q', numero: '2', nome: 'Quilombola; escola pública; renda familiar de até 1 salário mínimo por pessoa', descricao: 'Modalidade de referência 02.' },
  { codigo: 'LB_PCD', numero: '3', nome: 'Pessoa com deficiência; escola pública; renda familiar de até 1 salário mínimo por pessoa', descricao: 'Modalidade de referência 03.' },
  { codigo: 'LB_EP', numero: '4', nome: 'Escola pública; renda familiar de até 1 salário mínimo por pessoa', descricao: 'Modalidade de referência 04.' },
  { codigo: 'LI_PPI', numero: '5', nome: 'Pessoa preta, parda ou indígena; escola pública; independentemente de renda', descricao: 'Modalidade de referência 05.' },
  { codigo: 'LI_Q', numero: '6', nome: 'Quilombola; escola pública; independentemente de renda', descricao: 'Modalidade de referência 06.' },
  { codigo: 'LI_PCD', numero: '7', nome: 'Pessoa com deficiência; escola pública; independentemente de renda', descricao: 'Modalidade de referência 07.' },
  { codigo: 'LI_EP', numero: '8', nome: 'Escola pública, independentemente de renda', descricao: 'Modalidade de referência 08.' },
  { codigo: 'AC', numero: '9', nome: 'Ampla concorrência', descricao: 'Modalidade de referência 09.' },
  { codigo: 'V1', numero: '10', nome: 'Pessoa trans; escola pública', descricao: 'Ação afirmativa própria; modalidade de referência 10.' }
];

document.querySelectorAll('label[for="quota"]').forEach((label) => {
  label.textContent = 'Modalidade de referência';
});
