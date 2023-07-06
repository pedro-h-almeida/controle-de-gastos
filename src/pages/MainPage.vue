<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <q-card bordered>
          <!-- DATA/MES ATUAL -->
          <q-card-section>
            <div class="text-h5 text-weight-bold">
              {{ mes_ano_atual }}
            </div>
          </q-card-section>
          <q-separator inset />
          <!-- GASTO ATUAL / VALOR DISPONIVEL -->
          <q-card-section>
            <div class="row">
              <div class="col-12">
                <div class="row">
                  <div class="text-weight-bolder">Atual:</div>
                  &nbsp;
                  <div class="">
                    {{ valorAtual }}
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="row">
                  <div class="text-weight-bolder">Disponível:</div>
                  &nbsp;
                  <div class="">
                    {{ valorDisponivel }}
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-separator inset />
          <!-- IR PARA DETALHES DOS GASTOS -->
          <q-card-actions align="right">
            <q-btn
              flat
              color="info"
              size="12px"
              label="Ir para detalhes"
              icon-right="fas fa-arrow-right"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        icon="add"
        color="positive"
        label="Novo Gasto"
        class="q-pa-md"
        style="border-radius: 20px"
        @click="newExpenseBtnClick"
      />
    </q-page-sticky>
  </q-page>
</template>

<style lang="scss" scoped></style>

<script setup>
const mes_ano_atual = "FEV/2023";
const valorAtual = "R$ 200,00";
const valorDisponivel = "R$ 400,00";

function newExpenseBtnClick() {
  console.log("NEW EXPENSE BTN CLICK");
}
</script>
