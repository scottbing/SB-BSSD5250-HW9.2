package edu.nmhu.bssd5250.sb_bssd5250_webview

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebView
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.LinearLayoutCompat

class MainActivity : AppCompatActivity() {

    private lateinit var infoText: TextView
    private var isGame: Boolean = false
    private var isAnim: Boolean = false

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {

        isGame = false
        isAnim = false

        super.onCreate(savedInstanceState)

        val webView = WebView(this).apply {

            settings.javaScriptEnabled = true

            //loadUrl("https://javascript.info/article/js-animation/move/")
            layoutParams = LinearLayoutCompat.LayoutParams(
                LinearLayoutCompat.LayoutParams.MATCH_PARENT,
                0,0.9F
            )
        }

        infoText = TextView(this).apply {
            hint="Click the buttons"
            text=context.getString(R.string.site)
            layoutParams = LinearLayoutCompat.LayoutParams(
                LinearLayoutCompat.LayoutParams.WRAP_CONTENT,
                LinearLayoutCompat.LayoutParams.WRAP_CONTENT
            )
        }

        val game = Button(this).apply {
            "Load Game".also { text = it }
            setOnClickListener {
                infoText.text = context.getString(R.string.game_site)
                isGame = true
                isAnim = false
                loadInternetDataTo(webView)
            }
            layoutParams = LinearLayoutCompat.LayoutParams(
                LinearLayoutCompat.LayoutParams.WRAP_CONTENT,
                LinearLayoutCompat.LayoutParams.WRAP_CONTENT
            )
        }

        val anim = Button(this).apply {
            "Load Animation".also { text = it }
            setOnClickListener {
                isAnim = true
                isGame = false
                infoText.text = context.getString(R.string.anim_site)
                loadInternetDataTo(webView)
            }
            layoutParams = LinearLayoutCompat.LayoutParams(
                LinearLayoutCompat.LayoutParams.WRAP_CONTENT,
                LinearLayoutCompat.LayoutParams.WRAP_CONTENT
            )
        }

        val buttonLayout = LinearLayoutCompat(this).apply {
            orientation = LinearLayoutCompat.HORIZONTAL
            layoutParams = LinearLayoutCompat.LayoutParams(
                LinearLayoutCompat.LayoutParams.WRAP_CONTENT,
                LinearLayoutCompat.LayoutParams.WRAP_CONTENT)
            addView(game)
            addView(anim)
        }

        val linearLayout = LinearLayoutCompat(this).apply {
            layoutParams = LinearLayoutCompat.LayoutParams(
                LinearLayoutCompat.LayoutParams.MATCH_PARENT,
                LinearLayoutCompat.LayoutParams.MATCH_PARENT
            )
            isGame = true
            orientation = LinearLayoutCompat.VERTICAL
            //addView(game)
            //addView(anim)
            addView(buttonLayout)
            addView(infoText)
            addView(webView)
            weightSum = 1.0F
        }

        setContentView(linearLayout)

    }

    private fun loadInternetDataTo(webView: WebView) {
        if (isGame) webView.loadUrl("file:///android_asset/match-3/match3.html")
        if (isAnim) webView.loadUrl("https://mdn.github.io/webgl-examples/tutorial/sample8/")

    }

}