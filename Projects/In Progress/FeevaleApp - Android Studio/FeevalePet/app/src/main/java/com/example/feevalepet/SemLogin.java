package com.example.feevalepet;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;

import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

public class SemLogin extends AppCompatActivity {

    private TextView textResultado;

    private final ActivityResultLauncher<Intent> qrCodeLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                IntentResult intentResult = IntentIntegrator.parseActivityResult(
                        result.getResultCode(),
                        result.getData()
                );
                if (intentResult != null) {
                    if (intentResult.getContents() != null) {
                        textResultado.setText(intentResult.getContents());
                    } else {
                        textResultado.setText("Leitura cancelada");
                    }
                }
            }
    );

    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sem_login);

        Button btnLerQR = findViewById(R.id.btnLerQR);
        textResultado = findViewById(R.id.textResultado);

        btnLerQR.setOnClickListener(v -> {
            IntentIntegrator integrator = new IntentIntegrator(SemLogin.this);
            integrator.setDesiredBarcodeFormats(IntentIntegrator.QR_CODE);
            integrator.setPrompt("Escaneie o QR Code");
            integrator.setCameraId(0);
            integrator.setBeepEnabled(true);
            integrator.setBarcodeImageEnabled(true);

            Intent intent = integrator.createScanIntent();
            qrCodeLauncher.launch(intent);
        });
    }
}
